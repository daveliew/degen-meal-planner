# Deployment Guide

## Your App is Deployed! 🚀

Your Degen Meal Planner is now live at:
- **Preview**: https://degen-bh8ulyxp0-daveliews-projects.vercel.app
- **Dashboard**: https://vercel.com/daveliews-projects/degen-app/settings

## ⚠️ Important: Add Environment Variables

The app won't work until you add your Anthropic API key:

1. Go to your [Vercel Dashboard](https://vercel.com/daveliews-projects/degen-app/settings/environment-variables)
2. Add the following environment variable:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key
   - **Environment**: Production, Preview, Development

3. Click "Save"

## Custom Domain (Optional)

To add a custom domain:
1. Go to [Domains settings](https://vercel.com/daveliews-projects/degen-app/settings/domains)
2. Add your domain (e.g., `mealplanner.sg`)
3. Follow DNS configuration instructions

## Monitoring

- **Analytics**: View at https://vercel.com/daveliews-projects/degen-app/analytics
- **Logs**: Check at https://vercel.com/daveliews-projects/degen-app/logs
- **Speed Insights**: Enable in project settings

## Redeploy

To deploy new changes:
```bash
git push origin main
```

Or manually:
```bash
vercel --prod
```

## Troubleshooting

If the app shows errors:
1. Check if environment variables are set
2. View logs in Vercel dashboard
3. Ensure all dependencies are in package.json

## Next Steps

1. Add environment variable on Vercel ✅
2. Test the live app
3. Share with friends!
4. Consider adding a custom domain

---

Deployed with ❤️ using Vercel