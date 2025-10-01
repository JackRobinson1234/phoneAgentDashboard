# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. ✅ A Supabase account with your database set up
2. ✅ The Supabase anon key (safe for client-side use)
3. ✅ A GitHub account
4. ✅ A Vercel account (free tier works)

## Step 1: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://aupkbdhnljgoqwkjyxlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Where to find your Supabase keys:**
1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the "Project URL" and "anon public" key

## Step 2: Test Locally

Run the development server to ensure everything works:

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- ✅ Calls list loads
- ✅ Stats cards display data
- ✅ Call detail pages work
- ✅ Analytics dashboard renders

## Step 3: Push to GitHub

Initialize git and push to GitHub:

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial Phone Agent Analytics Dashboard"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/phoneAgent-dashboard.git

# Push to GitHub
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your anon key
   - Apply to: Production, Preview, and Development

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

## Step 5: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Step 6: Verify Deployment

Once deployed, test your production site:

1. Visit your Vercel URL (e.g., `phoneagent-dashboard.vercel.app`)
2. Check that all pages load correctly
3. Verify data is fetching from Supabase
4. Test navigation between pages

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Ensure all `NEXT_PUBLIC_*` variables are set in Vercel
- Redeploy after adding variables

**Error: Module not found**
- Check `package.json` has all dependencies
- Run `npm install` locally to verify

### Data Not Loading

**Error: Failed to fetch from Supabase**
- Verify Supabase URL and anon key are correct
- Check Supabase project is active
- Ensure Row Level Security (RLS) policies allow read access

**Empty dashboard**
- Verify your database has data in `calls` and `state_transitions` tables
- Check browser console for errors

### Mermaid Diagrams Not Rendering

- Ensure Mermaid syntax is valid
- Check browser console for JavaScript errors
- Try clearing browser cache

## Performance Optimization

### Enable Caching

Add caching headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=60, stale-while-revalidate=120' }
        ]
      }
    ]
  }
}
```

### Database Indexing

Ensure these indexes exist in Supabase:

```sql
-- Index on call_id for faster lookups
CREATE INDEX idx_state_transitions_call_id ON state_transitions(call_id);

-- Index on start_time for date filtering
CREATE INDEX idx_calls_start_time ON calls(start_time);

-- Index on completion_status for filtering
CREATE INDEX idx_calls_status ON calls(completion_status);
```

## Monitoring

### Vercel Analytics

Enable Vercel Analytics for performance monitoring:

1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable Web Analytics

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/nextjs
```

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Push to `main`**: Deploys to production
- **Push to other branches**: Creates preview deployments
- **Pull requests**: Automatic preview URLs

## Security Checklist

- ✅ Environment variables are not committed to git
- ✅ Supabase RLS policies are enabled
- ✅ Only anon key is used (not service role key)
- ✅ HTTPS is enabled (automatic with Vercel)
- ✅ CORS is configured in Supabase if needed

## Updating the Dashboard

To deploy updates:

```bash
# Make your changes
git add .
git commit -m "Update dashboard features"
git push

# Vercel automatically deploys the changes
```

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review Supabase logs
3. Check browser console for errors
4. Verify environment variables are set correctly

## Next Steps

After deployment, consider:

- Setting up monitoring and alerts
- Adding authentication if needed
- Implementing real-time updates with Supabase subscriptions
- Adding more analytics features
- Customizing the UI to match your brand

---

**Deployment Complete!** 🎉

Your Phone Agent Analytics Dashboard is now live and ready to visualize your call data.
