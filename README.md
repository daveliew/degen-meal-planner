# AI Meal Planner for Singaporeans

A simple AI-powered meal planning app that generates 7-day meal plans featuring Singaporean cuisine.

## Quick Start

1. **Set up environment variables**
   
   Create a `.env.local` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Calculate daily calorie needs based on user stats
- Generate 7-day meal plans with Singaporean dishes
- Tailored for different fitness goals (lose weight, maintain, gain muscle)
- Simple, clean interface

## Deployment

This app is ready to deploy on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy!

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- OpenAI GPT-3.5