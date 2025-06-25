'use client';

import { useState } from 'react';
import { Weight, Scale, Activity, Goal, Bot, Loader, User, FileText, X, ChefHat } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    activityLevel: 'medium',
    goal: 'maintain'
  });
  const [mealPlan, setMealPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<{name: string; day: string; type: string} | null>(null);
  const [mealDetails, setMealDetails] = useState<{recipe: string; image: string; loading: boolean}>({
    recipe: '',
    image: '',
    loading: false
  });

  const calculateCalories = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = 40; // Default age as per PRD
    
    // Basic BMR calculation (Mifflin-St Jeor for men)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    
    // Activity multipliers
    const activityMultipliers = {
      low: 1.2,
      medium: 1.5,
      high: 1.8
    };
    
    const tdee = bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers];
    
    // Adjust for goal
    if (formData.goal === 'lose') return Math.round(tdee - 500);
    if (formData.goal === 'gain') return Math.round(tdee + 300);
    return Math.round(tdee);
  };

  const generateMealPlan = async () => {
    setLoading(true);
    const calories = calculateCalories();
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calories, goal: formData.goal }),
      });
      
      const data = await response.json();
      setMealPlan(data.mealPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
    
    setLoading(false);
  };

  const fetchMealDetails = async (mealName: string, day: string, type: string) => {
    setSelectedMeal({ name: mealName, day, type });
    setMealDetails({ recipe: '', image: '', loading: true });
    
    try {
      const response = await fetch('/api/meal-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealName }),
      });
      
      const data = await response.json();
      setMealDetails({
        recipe: data.recipe,
        image: data.image,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching meal details:', error);
      setMealDetails({
        recipe: 'Failed to load recipe',
        image: '',
        loading: false
      });
    }
  };
  
  const renderMealPlan = () => {
    if (!mealPlan) return null;
    const days = mealPlan.split(/(?=DAY \d+:|Day \d+:)/i).filter(d => d.trim());
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {days.map((day, index) => {
          const lines = day.split('\n').filter(l => l.trim());
          const dayTitle = lines[0];
          const meals = lines.slice(1);
          
          return (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-5 rounded-lg hover:bg-white/15 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-base sm:text-lg font-bold text-teal-400 mb-2 sm:mb-3 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-xs sm:text-sm">
                  {index + 1}
                </span>
                <span className="truncate">{dayTitle.trim()}</span>
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                {meals.map((meal, mealIndex) => {
                  const isBreakfast = meal.toLowerCase().includes('breakfast');
                  const isLunch = meal.toLowerCase().includes('lunch');
                  const isDinner = meal.toLowerCase().includes('dinner');
                  const mealIcon = isBreakfast ? '🌅' : isLunch ? '☀️' : isDinner ? '🌙' : '🍽️';
                  
                  const mealName = meal.split('(')[0].trim().replace(/^(Breakfast|Lunch|Dinner):\s*/i, '');
                  const mealType = isBreakfast ? 'Breakfast' : isLunch ? 'Lunch' : isDinner ? 'Dinner' : 'Meal';
                  
                  return (
                    <div 
                      key={mealIndex} 
                      className="flex items-start gap-1.5 sm:gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                      onClick={() => fetchMealDetails(mealName, dayTitle.trim(), mealType)}
                    >
                      <span className="text-base sm:text-lg flex-shrink-0">{mealIcon}</span>
                      <p className="text-xs sm:text-sm text-gray-300 flex-1 leading-relaxed">{meal.trim()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-pattern text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <header className="text-center mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-2 sm:mb-4">
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              AI Meal Planner SG
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 px-4 sm:px-0">
            Craft your perfect 7-day meal plan, localized for Singapore.
          </p>
        </header>

        <main className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
              <div className="bg-teal-500/10 p-2 sm:p-2.5 lg:p-3 rounded-full">
                <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-teal-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-100">Your Details</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 sm:py-3.5 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                    placeholder="Weight (kg)"
                  />
                </div>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 sm:py-3.5 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                    placeholder="Height (cm)"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <select
                    value={formData.activityLevel}
                    onChange={(e) => setFormData({...formData, activityLevel: e.target.value})}
                    className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 sm:py-3.5 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                  >
                    <option value="low">Low (Little/no exercise)</option>
                    <option value="medium">Medium (Exercise 2-3x/week)</option>
                    <option value="high">High (Exercise 4-5x/week)</option>
                  </select>
                </div>
                
                <div className="relative">
                  <Goal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 sm:py-3.5 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                  >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Muscle</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={generateMealPlan}
                disabled={loading || !formData.weight || !formData.height}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold sm:font-bold py-3 sm:py-3.5 lg:py-4 px-4 text-sm sm:text-base rounded-lg hover:from-teal-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Generating Plan...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Generate 7-Day Meal Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {mealPlan && (
            <div className="mt-6 sm:mt-8 lg:mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                  <div className="bg-teal-500/10 p-2 sm:p-2.5 lg:p-3 rounded-full">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-teal-400" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-100">Your 7-Day Meal Plan</h2>
                </div>
                {renderMealPlan()}
              </div>
            </div>
          )}
        </main>
        
        <footer className="text-center mt-8 sm:mt-12 lg:mt-16 text-gray-500 text-xs sm:text-sm">
          <p>Powered by Degen AI • Built for Healthy Degens</p>
        </footer>
      </div>

      {/* Meal Details Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMeal(null)}>
          <div 
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedMeal.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{selectedMeal.day} • {selectedMeal.type}</p>
              </div>
              <button
                onClick={() => setSelectedMeal(null)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              {mealDetails.loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="animate-spin w-8 h-8 text-teal-400 mb-4" />
                  <p className="text-gray-400">Loading recipe...</p>
                </div>
              ) : (
                <>
                  {mealDetails.image && (
                    <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                      <Image
                        src={mealDetails.image}
                        alt={selectedMeal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-teal-400 mb-4">
                      <ChefHat className="w-5 h-5" />
                      <h4 className="text-lg font-semibold">Recipe</h4>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                        {mealDetails.recipe}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}