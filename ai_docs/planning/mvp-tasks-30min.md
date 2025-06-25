# 30-Minute MVP - AI Meal Planner for Singaporeans

## What We're Building
A single-page web app that generates a 7-day meal plan using AI, focused on Singaporean dishes.

## Tasks (30 minutes)

### Phase 1: Setup (5 minutes)
- [ ] Create Next.js app with TypeScript
- [ ] Install dependencies (Vercel AI SDK, Tailwind)
- [ ] Set up environment variables for AI API key

### Phase 2: Core Functionality (20 minutes)
- [ ] Create a simple form to collect:
  - [ ] Weight (kg)
  - [ ] Height (cm)
  - [ ] Activity level (dropdown: Low/Medium/High)
  - [ ] Goal (dropdown: Lose Weight/Maintain/Gain Muscle)
- [ ] Build AI prompt that includes:
  - [ ] Calculated daily calories based on inputs
  - [ ] Focus on Singaporean dishes
  - [ ] 7 days × 3 meals format
- [ ] Create single API route to generate meal plan
- [ ] Display the generated meal plan on the same page

### Phase 3: Polish (5 minutes)
- [ ] Add basic Tailwind styling
- [ ] Add loading state while generating
- [ ] Deploy to Vercel

## What We're Cutting
- ❌ User authentication
- ❌ Database/persistence
- ❌ Meal customization
- ❌ Nutritional breakdowns
- ❌ Multiple pages
- ❌ Error handling beyond basics

## Quick Start Commands
```bash
npx create-next-app@latest degen-app --typescript --tailwind --app
cd degen-app
npm install ai openai
```

## Single File Approach
Put everything in `app/page.tsx` - form, API call, and display. No routing needed.

## AI Prompt Template
```
Generate a 7-day meal plan for a Singaporean person:
- Daily calories: [CALCULATED]
- Goal: [USER_GOAL]

Format each day with Breakfast, Lunch, Dinner using popular Singaporean dishes like Chicken Rice, Fish Soup, Nasi Lemak, etc. Keep it simple and practical.
```

This is achievable in 30 minutes if we focus only on the absolute essentials!