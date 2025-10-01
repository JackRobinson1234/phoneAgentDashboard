# Phone Agent Analytics Dashboard

A Next.js 14 dashboard for visualizing call flows and analytics from AI voice agent conversations stored in Supabase.

## Features

- 📊 **Real-time Analytics** - View call metrics, completion rates, and token usage
- 🔄 **Interactive Flow Diagrams** - Mermaid.js visualizations of conversation state transitions
- 💬 **Conversation Timeline** - Detailed view of user-agent interactions
- 📈 **Performance Charts** - Track trends and identify bottlenecks
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Mermaid.js + Recharts
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account with database set up
- Environment variables configured

### Installation

1. **Clone and install dependencies**

```bash
cd phoneAgent-dashboard
npm install
```

2. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://aupkbdhnljgoqwkjyxlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
phoneAgent-dashboard/
├── app/                      # Next.js app router pages
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page (calls list)
│   ├── calls/[id]/          # Call detail page
│   └── analytics/           # Analytics dashboard
├── components/              # React components
│   ├── ui/                  # shadcn/ui base components
│   ├── CallsList.tsx        # Calls table
│   ├── CallDetail.tsx       # Call detail view
│   ├── MermaidFlowChart.tsx # Flow diagram renderer
│   ├── ConversationTimeline.tsx # Timeline view
│   ├── AnalyticsCharts.tsx  # Charts and metrics
│   └── StatsCards.tsx       # Summary cards
├── lib/                     # Core utilities
│   ├── supabase.ts          # Supabase client
│   ├── types.ts             # TypeScript types
│   ├── queries.ts           # Database queries
│   └── utils.ts             # Helper functions
└── package.json
```

## Database Schema

The dashboard connects to two main tables:

### `calls` table
- Stores call metadata (duration, status, tokens, etc.)
- Primary key: `call_id` (UUID)

### `state_transitions` table
- Stores individual conversation steps
- Links to calls via `call_id` foreign key
- Contains user input, agent responses, and context updates

## Features Overview

### 1. Calls Dashboard
- View all calls with filtering options
- See status, duration, states visited, and token usage
- Click any call to view detailed flow

### 2. Call Detail Page
- **Flow Chart**: Visual representation of state transitions
- **Timeline**: Step-by-step conversation breakdown
- **Metrics**: Duration, LLM calls, tokens used
- **Context**: View context updates at each step

### 3. Analytics Dashboard
- **Summary Cards**: Total calls, completion rate, avg duration, tokens
- **Top Transitions**: Most common state transitions
- **Trends**: Call duration over time

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

```bash
git init
git add .
git commit -m "Initial dashboard"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variables in Vercel settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy!

## Development

### Build for production

```bash
npm run build
npm start
```

### Lint code

```bash
npm run lint
```

## Customization

### Adding New Charts

Edit `components/AnalyticsCharts.tsx` to add custom visualizations using Recharts.

### Modifying Flow Diagrams

Update `lib/queries.ts` `generateMermaidDiagram()` function to customize the Mermaid syntax.

### Styling

Tailwind CSS classes can be modified throughout. Update `tailwind.config.ts` for theme changes.

## Troubleshooting

### Environment Variables Not Loading
- Ensure `.env.local` exists and is not gitignored
- Restart the dev server after adding variables

### Supabase Connection Issues
- Verify your Supabase URL and anon key
- Check Row Level Security (RLS) policies in Supabase

### Mermaid Diagrams Not Rendering
- Check browser console for errors
- Ensure diagram syntax is valid

## Support

For issues or questions:
- Check the [Next.js docs](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- See [Mermaid syntax guide](https://mermaid.js.org/)

## License

MIT
