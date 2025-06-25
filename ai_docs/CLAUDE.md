# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered meal planning application specifically designed for Singaporeans, with an initial focus on 40-year-old men. The app helps health-conscious but time-poor individuals plan nutritionally balanced meals while incorporating culturally relevant Singaporean cuisine.

## Technology Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS  
- **Backend/Database**: Supabase (authentication & data storage)
- **AI Integration**: Vercel AI SDK
- **Platform**: Responsive web application

## Development Commands

Since this project is not yet initialized, here are the expected commands once set up:

```bash
# Initial setup (once project is initialized)
npm install

# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Type checking (once TypeScript is configured)
npm run type-check

# Linting (once ESLint is configured)
npm run lint

# Testing (once test framework is set up)
npm test
```

## Project Architecture

### Core Features (MVP)

1. **User Profile System**: Collects and stores user data (age, gender, height, weight, activity level, dietary goals)
2. **AI Meal Plan Generator**: Creates 7-day meal plans with 3 meals per day, focusing on Singaporean dishes
3. **Nutritional Tracking**: Displays calories, protein, carbohydrates, and fat for each meal
4. **Meal Customization**: Allows regeneration of entire plans or swapping individual meals
5. **Health Tips**: Provides guidance for healthier choices at hawker centers

### Expected Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── api/               # API routes for AI integration
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main meal planning interface
│   └── profile/           # User profile management
├── components/            # Reusable React components
│   ├── meals/            # Meal-related components
│   └── ui/               # Generic UI components
├── lib/                   # Utility functions and configurations
│   ├── supabase/         # Supabase client and helpers
│   └── ai/               # AI SDK integration
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

### Key Implementation Notes

1. **Singaporean Food Database**: The app requires a comprehensive database of Singaporean dishes with accurate nutritional information
2. **AI Prompting**: Meal generation should consider cultural relevance, nutritional balance, and user preferences
3. **Responsive Design**: Must work seamlessly on both mobile and desktop devices
4. **State Management**: User profiles and meal plans need proper state management (consider using React Context or Zustand)

### Development Priorities

1. Initialize Next.js project with TypeScript
2. Set up Supabase authentication and database
3. Create user onboarding flow
4. Implement AI meal plan generation
5. Build meal display and customization interface
6. Add nutritional information display

### Important Considerations

- **Cultural Sensitivity**: Ensure the app respects local food culture and dietary practices
- **Health Focus**: Balance between authentic Singaporean cuisine and health goals
- **Performance**: Optimize AI response times for smooth user experience
- **Data Privacy**: Properly secure user health and dietary information