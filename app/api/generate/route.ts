import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { calories, goal } = await req.json();
  
  const goalDescriptions = {
    lose: 'lose weight',
    maintain: 'maintain current weight',
    gain: 'gain muscle'
  };
  
  const prompt = `Generate a 7-day meal plan for a 40-year-old Singaporean man with the following requirements:
- Daily calorie target: ${calories} calories
- Goal: ${goalDescriptions[goal as keyof typeof goalDescriptions]}

Create a practical meal plan featuring popular Singaporean dishes from hawker centers and simple home-cooked meals. Include dishes like Chicken Rice, Fish Soup, Nasi Lemak, Thunder Tea Rice, Yong Tau Foo, etc.

Format the response as:
DAY 1:
Breakfast: [Meal name] (~[calories] cal)
Lunch: [Meal name] (~[calories] cal)
Dinner: [Meal name] (~[calories] cal)

Continue for all 7 days. Make sure the daily total is close to ${calories} calories.

For hawker meals, include brief tips like "ask for less rice" or "choose steamed over roasted" where appropriate.`;

  try {
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt,
    });

    return NextResponse.json({ mealPlan: text });
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Failed to generate meal plan' }, { status: 500 });
  }
}