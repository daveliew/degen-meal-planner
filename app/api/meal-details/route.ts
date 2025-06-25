import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { mealName } = await req.json();
  
  const prompt = `Generate a detailed recipe for "${mealName}" - a popular Singaporean dish.

Include:
1. A brief description of the dish
2. Ingredients list with measurements
3. Step-by-step cooking instructions
4. Cooking tips for best results
5. Nutritional information estimate

Format the response as:
DESCRIPTION:
[Brief description]

INGREDIENTS:
- [ingredient 1]
- [ingredient 2]
...

INSTRUCTIONS:
1. [step 1]
2. [step 2]
...

TIPS:
- [tip 1]
- [tip 2]

NUTRITIONAL INFO:
- Calories: [amount]
- Protein: [amount]
- Carbs: [amount]
- Fat: [amount]`;

  try {
    const { text } = await generateText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt,
    });

    // Use static images for common Singaporean dishes
    const dishImages: { [key: string]: string } = {
      'thunder tea rice': 'https://images.pexels.com/photos/6646024/pexels-photo-6646024.jpeg?auto=compress&cs=tinysrgb&w=800',
      'chicken rice': 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800',
      'nasi lemak': 'https://images.pexels.com/photos/3926133/pexels-photo-3926133.jpeg?auto=compress&cs=tinysrgb&w=800',
      'laksa': 'https://images.pexels.com/photos/12737799/pexels-photo-12737799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'char kway teow': 'https://images.pexels.com/photos/3217156/pexels-photo-3217156.jpeg?auto=compress&cs=tinysrgb&w=800',
      'bak kut teh': 'https://images.pexels.com/photos/7245464/pexels-photo-7245464.jpeg?auto=compress&cs=tinysrgb&w=800',
      'fish soup': 'https://images.pexels.com/photos/12419173/pexels-photo-12419173.jpeg?auto=compress&cs=tinysrgb&w=800',
      'yong tau foo': 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800',
      'roti prata': 'https://images.pexels.com/photos/9609842/pexels-photo-9609842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'hokkien mee': 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
      'kaya toast': 'https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&w=800',
      'satay': 'https://images.pexels.com/photos/8992939/pexels-photo-8992939.jpeg?auto=compress&cs=tinysrgb&w=800',
      'hor fun': 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800',
      'mee goreng': 'https://images.pexels.com/photos/12419160/pexels-photo-12419160.jpeg?auto=compress&cs=tinysrgb&w=800',
      'fishball noodles': 'https://images.pexels.com/photos/12737799/pexels-photo-12737799.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    
    // Try to match the dish name
    const lowerMealName = mealName.toLowerCase();
    let imageUrl = '';
    
    // Look for a match in our static images
    for (const [dish, url] of Object.entries(dishImages)) {
      if (lowerMealName.includes(dish) || dish.includes(lowerMealName)) {
        imageUrl = url;
        break;
      }
    }
    
    // Fallback to a generic Asian food image
    if (!imageUrl) {
      imageUrl = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
    }

    return NextResponse.json({ 
      recipe: text,
      image: imageUrl
    });
  } catch (error) {
    console.error('Error generating meal details:', error);
    return NextResponse.json({ 
      error: 'Failed to generate meal details',
      recipe: `Recipe for ${mealName}\n\nWe're having trouble loading the detailed recipe right now. Please try again later.`,
      image: `https://source.unsplash.com/800x600/?${encodeURIComponent(mealName + ' food')}`
    }, { status: 500 });
  }
}