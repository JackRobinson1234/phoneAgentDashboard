# Quick Start Guide

Get your Phone Agent Analytics Dashboard running in 5 minutes!

## 1. Configure Environment (1 min)

Create `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://aupkbdhnljgoqwkjyxlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Get your Supabase anon key:**
- Go to Supabase Dashboard → Settings → API
- Copy the "anon public" key

## 2. Install Dependencies (2 min)

```bash
npm install
```

## 3. Run Development Server (1 min)

```bash
npm run dev
```

## 4. View Dashboard (1 min)

Open [http://localhost:3000](http://localhost:3000)

You should see:
- 📊 Call statistics cards
- 📋 List of recent calls
- 🔍 Filters for status

## 5. Explore Features

### View Call Details
- Click "View Details" on any call
- See the conversation flow diagram
- Review the timeline of interactions

### Check Analytics
- Click "Analytics" in the navigation
- View completion rates and trends
- See top state transitions

## Troubleshooting

### "No calls found"
- Your database might be empty
- Verify your Supabase credentials
- Check that tables `calls` and `state_transitions` exist

### Connection errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Check Supabase project is active

### Build errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall
- Check Node.js version (requires 18+)

## Next Steps

1. **Customize**: Edit components in `components/` folder
2. **Deploy**: Follow `DEPLOYMENT.md` for Vercel deployment
3. **Extend**: Add new features or charts

## Need Help?

- 📖 Read the full `README.md`
- 🚀 Check `DEPLOYMENT.md` for production setup
- 🔍 Review code comments for implementation details

---

**You're all set!** Start exploring your call analytics. 🎉
