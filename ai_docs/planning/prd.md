### **Product Requirements Document: AI Meal Planner for Singaporeans**

**1. Vision**

To create a personalized, AI-powered meal planning application that helps Singaporean adults, starting with 40-year-old men, achieve their health and fitness goals through nutritionally balanced and culturally relevant meal plans.

**2. Target Audience**

*   **Primary Persona:** A 40-year-old man living in Singapore.
*   **Characteristics:**
    *   Health-conscious but time-poor.
    *   Likely works a desk job, with a moderately active lifestyle (e.g., exercises 2-3 times a week).
    *   Familiar with and enjoys local Singaporean cuisine (hawker food, home-cooked dishes).
    *   May have specific health goals, such as weight management, muscle gain, or simply maintaining a healthy diet.
    *   Comfortable using mobile and web applications.

**3. User Problems We're Solving**

*   **Difficulty in Nutritional Tracking:** It's hard to estimate the calorie and macronutrient content of local Singaporean dishes.
*   **Lack of Time for Meal Planning:** Busy schedules make it difficult to proactively plan healthy meals.
*   **Decision Fatigue:** Deciding "what to eat" every day is a recurring mental burden.
*   **Balancing Health and Culture:** A desire to eat healthy without giving up beloved local foods.
*   **Generic Advice Doesn't Fit:** Most meal planners are based on Western diets and don't account for the unique Singaporean food landscape.

**4. Core Features (Minimum Viable Product)**

*   **Onboarding & User Profile:**
    *   Collect essential user data: age (default 40), gender (default male), height, weight, activity level (e.g., sedentary, moderately active), and primary goal (e.g., lose weight, maintain, gain muscle).
*   **AI-Powered Meal Plan Generation:**
    *   The user can request a 7-day meal plan.
    *   The AI will generate a 3-meal-per-day plan (breakfast, lunch, dinner) tailored to the user's calculated daily calorie and macronutrient targets.
    *   The plan will heavily feature popular and healthy Singaporean dishes (e.g., Sliced Fish Soup, Thunder Tea Rice) and simple home-cooked meal suggestions.
*   **View & Interact with Meal Plan:**
    *   Display the plan in a clear, day-by-day format.
    *   For each meal, show the estimated nutritional information (calories, protein, carbs, fat).
    *   Allow the user to regenerate or swap an individual meal if they dislike the suggestion.
*   **Meal Information & Tips:**
    *   Provide brief details on why a meal is a good choice. For hawker meals, include tips for making healthier choices (e.g., "Ask for less rice," "Choose steamed over roasted chicken").

**5. Technology Stack & Non-Functional Requirements**

*   **Stack:**
    *   **Frontend:** Next.js, Tailwind CSS
    *   **Backend/Database:** Supabase (for user auth and data)
    *   **AI:** Vercel AI SDK
    *   **Language:** TypeScript
*   **Data:** The core of the application will be a robust database of Singaporean food items with detailed nutritional information. This may need to be compiled or estimated with AI.
*   **Platform:** A responsive web application that works well on both desktop and mobile.

**6. Success Metrics**

*   **Engagement:** Number of meal plans generated per week.
*   **Retention:** Percentage of users who return to generate a plan the following week.
*   **User Satisfaction:** Qualitative feedback via a simple "Was this plan helpful?" prompt.

**7. Future Enhancements (Post-MVP)**

*   **Expanded Profiles:** Include dietary restrictions (halal, vegetarian), allergies, etc.
*   **Grocery List Generation:** Automatically create a shopping list for home-cooked meals.
*   **Snack & Hydration Tracking:** Add healthy snack options and water intake goals. 