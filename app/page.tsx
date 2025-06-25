'use client';

import { useState } from 'react';
import { Weight, Scale, Activity, Goal, Bot, Loader, User, FileText } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    activityLevel: 'medium',
    goal: 'maintain'
  });
  const [mealPlan, setMealPlan] = useState('');
  const [loading, setLoading] = useState(false);

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
  
  const renderMealPlan = () => {
    if (!mealPlan) return null;
    const days = mealPlan.split(/(?=DAY \d+:|Day \d+:)/i).filter(d => d.trim());
    return (
      <div className="space-y-4">
        {days.map((day, index) => {
          const lines = day.split('\n').filter(l => l.trim());
          const dayTitle = lines[0];
          const meals = lines.slice(1);
          
          return (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/15 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-bold text-teal-400 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {dayTitle.trim()}
              </h3>
              <div className="space-y-2">
                {meals.map((meal, mealIndex) => {
                  const isBreakfast = meal.toLowerCase().includes('breakfast');
                  const isLunch = meal.toLowerCase().includes('lunch');
                  const isDinner = meal.toLowerCase().includes('dinner');
                  const mealIcon = isBreakfast ? '🌅' : isLunch ? '☀️' : isDinner ? '🌙' : '🍽️';
                  
                  return (
                    <div key={mealIndex} className="flex items-start gap-2">
                      <span className="text-lg">{mealIcon}</span>
                      <p className="text-gray-300 flex-1">{meal.trim()}</p>
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
    <div className="min-h-screen bg-gray-900 bg-pattern text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            AI Meal Planner SG
          </span>
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Craft your perfect 7-day meal plan, localized for Singapore.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-teal-500/10 p-3 rounded-full">
              <User className="w-6 h-6 text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-100">Your Details</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                  placeholder="Weight (kg)"
                />
              </div>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                  placeholder="Height (cm)"
                />
              </div>
            </div>
            
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData({...formData, activityLevel: e.target.value})}
                className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
              >
                <option value="low">Low (Little/no exercise)</option>
                <option value="medium">Medium (Exercise 2-3x/week)</option>
                <option value="high">High (Exercise 4-5x/week)</option>
              </select>
            </div>
            
            <div className="relative">
              <Goal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.goal}
                onChange={(e) => setFormData({...formData, goal: e.target.value})}
                className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Muscle</option>
              </select>
            </div>
            
            <button
              onClick={generateMealPlan}
              disabled={loading || !formData.weight || !formData.height}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:from-teal-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin w-5 h-5" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5" />
                  Generate 7-Day Meal Plan
                </>
              )}
            </button>
          </div>
        </div>

        {mealPlan && (
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-teal-500/10 p-3 rounded-full">
                <FileText className="w-6 h-6 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100">Your 7-Day Meal Plan</h2>
            </div>
            {renderMealPlan()}
          </div>
        )}
      </main>
      
      <footer className="w-full max-w-4xl text-center mt-8 text-gray-500 text-sm">
        <p>Powered by Degen AI • Built for Healthy Degens</p>
      </footer>
    </div>
  );
}