# MVP Development Tasks - AI Meal Planner for Singaporeans

## Phase 1: Project Setup & Infrastructure

### 1.1 Initialize Project
- [ ] Create Next.js project with TypeScript
- [ ] Configure ESLint and Prettier
- [ ] Set up Git repository
- [ ] Configure Tailwind CSS
- [ ] Set up project folder structure

### 1.2 Supabase Setup
- [ ] Create Supabase project
- [ ] Design database schema for:
  - [ ] Users table (profile information)
  - [ ] Meal plans table
  - [ ] User preferences table
- [ ] Set up authentication configuration
- [ ] Create environment variables file

### 1.3 AI Integration Setup
- [ ] Install and configure Vercel AI SDK
- [ ] Set up API keys and environment variables
- [ ] Create basic AI service wrapper

## Phase 2: Authentication & User Management

### 2.1 Authentication Flow
- [ ] Implement Supabase Auth integration
- [ ] Create sign-up page
- [ ] Create login page
- [ ] Implement password reset flow
- [ ] Add authentication middleware

### 2.2 User Profile System
- [ ] Create onboarding flow UI
- [ ] Build profile data collection form:
  - [ ] Age input (default: 40)
  - [ ] Gender selection (default: male)
  - [ ] Height and weight inputs
  - [ ] Activity level selector
  - [ ] Primary goal selector
- [ ] Implement profile data validation
- [ ] Create profile update functionality
- [ ] Calculate daily calorie/macro targets based on profile

## Phase 3: Core Meal Planning Features

### 3.1 Singaporean Food Database
- [ ] Research and compile nutritional data for common Singaporean dishes
- [ ] Create food items data structure
- [ ] Populate initial database with at least 50 popular dishes
- [ ] Include hawker favorites (Chicken Rice, Laksa, etc.)
- [ ] Add healthy home-cooked meal options

### 3.2 AI Meal Plan Generation
- [ ] Design AI prompt templates for meal planning
- [ ] Implement meal plan generation logic
- [ ] Create API endpoint for plan generation
- [ ] Ensure plans meet user's nutritional targets
- [ ] Implement error handling and fallbacks

### 3.3 Meal Plan Storage
- [ ] Design meal plan data structure
- [ ] Implement database operations for saving plans
- [ ] Create API for retrieving user's meal plans
- [ ] Add plan versioning/history

## Phase 4: User Interface Development

### 4.1 Dashboard & Navigation
- [ ] Create main dashboard layout
- [ ] Implement responsive navigation
- [ ] Add user profile summary widget
- [ ] Create "Generate New Plan" CTA

### 4.2 Meal Plan Display
- [ ] Design 7-day meal plan view
- [ ] Create individual meal card component
- [ ] Display nutritional information (calories, protein, carbs, fat)
- [ ] Implement day-by-day navigation
- [ ] Add print/export functionality

### 4.3 Meal Interaction Features
- [ ] Implement "Regenerate Meal" functionality
- [ ] Create meal swap interface
- [ ] Add meal details modal/page
- [ ] Include health tips for each meal
- [ ] Implement loading states and animations

## Phase 5: Polish & Optimization

### 5.1 Performance Optimization
- [ ] Implement proper loading states
- [ ] Add error boundaries
- [ ] Optimize API calls with caching
- [ ] Implement progressive web app features
- [ ] Add offline support for viewing saved plans

### 5.2 User Experience Enhancements
- [ ] Add onboarding tutorial
- [ ] Implement success notifications
- [ ] Create empty states for new users
- [ ] Add helpful tooltips and guidance
- [ ] Implement responsive design testing

### 5.3 Testing & Quality Assurance
- [ ] Write unit tests for critical functions
- [ ] Implement integration tests for API endpoints
- [ ] Test meal plan generation with various user profiles
- [ ] Perform cross-browser testing
- [ ] Conduct mobile responsiveness testing

## Phase 6: Analytics & Feedback

### 6.1 Analytics Implementation
- [ ] Set up analytics tracking (Vercel Analytics or similar)
- [ ] Track meal plan generation events
- [ ] Monitor user engagement metrics
- [ ] Implement error logging

### 6.2 User Feedback System
- [ ] Create feedback collection mechanism
- [ ] Add "Was this plan helpful?" prompt
- [ ] Implement feedback storage
- [ ] Create admin view for feedback analysis

## Phase 7: Deployment & Launch

### 7.1 Deployment Preparation
- [ ] Set up production environment variables
- [ ] Configure domain and SSL
- [ ] Set up CI/CD pipeline
- [ ] Implement database backups

### 7.2 Launch Checklist
- [ ] Conduct final testing on production
- [ ] Prepare user documentation
- [ ] Set up monitoring and alerts
- [ ] Create initial marketing materials
- [ ] Plan soft launch strategy

## Technical Debt & Documentation

### Throughout Development
- [ ] Maintain comprehensive README
- [ ] Document API endpoints
- [ ] Keep TypeScript types up to date
- [ ] Regular code reviews
- [ ] Update CLAUDE.md with new patterns

## Estimated Timeline

- **Phase 1-2**: 1 week (Setup & Auth)
- **Phase 3**: 2 weeks (Core Features)
- **Phase 4**: 2 weeks (UI Development)
- **Phase 5-7**: 1 week (Polish & Launch)

**Total MVP Timeline: ~6 weeks**

## Priority Notes

1. Focus on getting a working prototype early
2. Start with a limited food database and expand gradually
3. Ensure the AI generates culturally appropriate meals
4. Mobile responsiveness is crucial given the target audience
5. Keep the UI simple and intuitive