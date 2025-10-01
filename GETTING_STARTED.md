# 🚀 Getting Started with Phone Agent Analytics Dashboard

Welcome! This guide will get your dashboard up and running in minutes.

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **npm** or **yarn** package manager
- [ ] **Supabase account** with a project created
- [ ] **Database tables** (`calls` and `state_transitions`) set up
- [ ] **Supabase credentials** (URL and anon key)

## 📦 Step 1: Verify Installation

The project has already been created at:
```
/Users/jackrobinson/CascadeProjects/phoneAgent-dashboard/
```

Dependencies are installed. Verify with:
```bash
cd /Users/jackrobinson/CascadeProjects/phoneAgent-dashboard
npm list --depth=0
```

You should see all packages including:
- `next` (14.0.4)
- `@supabase/supabase-js`
- `mermaid`
- `recharts`
- `tailwindcss`

## 🔑 Step 2: Configure Environment

1. **Copy the example environment file:**
```bash
cp .env.local.example .env.local
```

2. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Go to **Settings** → **API**
   - Copy:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon public key** (starts with `eyJ...`)

3. **Edit `.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://aupkbdhnljgoqwkjyxlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

⚠️ **Important**: Replace `your_actual_anon_key_here` with your real anon key!

## 🗄️ Step 3: Verify Database Setup

Your Supabase database should have these tables:

### Check Tables Exist

Run this in Supabase SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('calls', 'state_transitions');
```

Should return 2 rows.

### Add Sample Data (Optional)

If your database is empty, load sample data:
```bash
# Open scripts/sample-data.sql in Supabase SQL Editor
# Copy and paste the entire file
# Click "Run"
```

This creates 4 sample calls with state transitions.

## 🏃 Step 4: Run Development Server

Start the development server:
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.3s
```

## 🌐 Step 5: Open Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

### What You Should See

**Home Page:**
- 4 stat cards at the top (Total Calls, Completion Rate, etc.)
- Filter buttons (All, Completed, Error, In Progress)
- Table of calls with columns: Session ID, Status, Duration, States, Tokens, Time, Actions

**If you see "No calls found":**
- Your database is empty → Load sample data (Step 3)
- Or check your Supabase credentials

## 🧪 Step 6: Test Features

### Test Call Details
1. Click **"View Details"** on any call
2. You should see:
   - Call info cards (Status, Duration, LLM Calls, Tokens)
   - Mermaid flow chart showing state transitions
   - Conversation timeline with user/agent messages

### Test Analytics
1. Click **"Analytics"** in the navigation
2. You should see:
   - Summary cards with metrics
   - Bar chart of top state transitions
   - Line chart of calls over time

## ✅ Verification Checklist

- [ ] Development server starts without errors
- [ ] Home page loads at `http://localhost:3000`
- [ ] Stats cards display numbers (not "0" or "NaN")
- [ ] Calls table shows data
- [ ] Clicking "View Details" opens call detail page
- [ ] Mermaid flow chart renders
- [ ] Conversation timeline displays
- [ ] Analytics page loads with charts
- [ ] Navigation between pages works
- [ ] No errors in browser console (F12 → Console)

## 🐛 Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Failed to fetch" or empty data

**Possible causes:**
1. **Wrong Supabase URL/key** → Check `.env.local`
2. **Database is empty** → Load sample data
3. **RLS policies blocking reads** → Check Supabase RLS settings

**Check connection:**
```bash
# In browser console (F12)
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
# Should show your Supabase URL
```

### Issue: Mermaid diagrams not rendering

**Solution:**
1. Check browser console for errors
2. Clear browser cache (Cmd+Shift+R on Mac)
3. Verify state transitions exist for the call

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors

**Solution:**
```bash
# Rebuild TypeScript
npm run build
```

## 📚 Next Steps

Now that your dashboard is running:

1. **Customize the UI**
   - Edit components in `components/`
   - Modify colors in `tailwind.config.ts`
   - Update layout in `app/layout.tsx`

2. **Add Features**
   - Implement real-time updates
   - Add search functionality
   - Create export to CSV

3. **Deploy to Production**
   - Follow `DEPLOYMENT.md` for Vercel deployment
   - Add your production Supabase credentials
   - Configure custom domain

4. **Connect Your Real Data**
   - Update your phone agent to log to these tables
   - Ensure call_id is UUID format
   - Maintain the schema structure

## 📖 Documentation Reference

| Document | Purpose |
|----------|---------|
| `README.md` | Full project documentation |
| `QUICKSTART.md` | 5-minute quick start |
| `DEPLOYMENT.md` | Production deployment guide |
| `TESTING.md` | Testing checklist |
| `PROJECT_SUMMARY.md` | Project overview |
| `GETTING_STARTED.md` | This file |

## 💡 Tips

- **Development**: Use `npm run dev` for hot reload
- **Production Build**: Test with `npm run build && npm start`
- **Linting**: Run `npm run lint` to check code quality
- **Environment**: Never commit `.env.local` to git

## 🎯 Common Tasks

### View Logs
```bash
# Terminal shows Next.js logs
# Browser console (F12) shows client errors
```

### Restart Server
```bash
# Press Ctrl+C in terminal
# Then run: npm run dev
```

### Clear Cache
```bash
rm -rf .next
npm run dev
```

### Update Dependencies
```bash
npm update
```

## 🆘 Need Help?

1. **Check documentation** in the project root
2. **Review code comments** in source files
3. **Check browser console** for client-side errors
4. **Check terminal** for server-side errors
5. **Verify Supabase** connection and data

## 🎉 Success!

If you can see your calls data and navigate between pages, you're all set!

**Your dashboard is ready to visualize phone agent analytics.** 📊

---

**Next:** Deploy to production using `DEPLOYMENT.md`
