# Phone Agent Analytics Dashboard - File Index

Complete reference of all project files and their purposes.

## 📁 Root Directory

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts |
| `package-lock.json` | Locked dependency versions |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS theme and config |
| `postcss.config.js` | PostCSS configuration |
| `.gitignore` | Git ignore rules |
| `.env.local.example` | Environment variables template |

## 📚 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `README.md` | Main project documentation | First read for overview |
| `GETTING_STARTED.md` | Step-by-step setup guide | Setting up for first time |
| `QUICKSTART.md` | 5-minute quick start | Fast setup |
| `DEPLOYMENT.md` | Production deployment guide | Deploying to Vercel |
| `TESTING.md` | Testing checklist | Before deployment |
| `PROJECT_SUMMARY.md` | Project overview | Understanding what was built |
| `FILE_INDEX.md` | This file - complete file reference | Finding specific files |

## 🎨 App Directory (`app/`)

Next.js 14 App Router pages and layouts.

| File | Route | Purpose |
|------|-------|---------|
| `layout.tsx` | All pages | Root layout with navigation |
| `page.tsx` | `/` | Home page - calls list |
| `globals.css` | All pages | Global CSS styles |
| `not-found.tsx` | `/404` | 404 error page |
| `analytics/page.tsx` | `/analytics` | Analytics dashboard |
| `calls/[id]/page.tsx` | `/calls/:id` | Call detail page |

### Layout Hierarchy
```
layout.tsx (Root)
├── page.tsx (Home)
├── analytics/page.tsx (Analytics)
├── calls/[id]/page.tsx (Call Detail)
└── not-found.tsx (404)
```

## 🧩 Components Directory (`components/`)

React components for the UI.

### Feature Components

| File | Purpose | Used In |
|------|---------|---------|
| `CallsList.tsx` | Table of all calls | Home page |
| `CallDetail.tsx` | Call detail wrapper | Call detail page |
| `MermaidFlowChart.tsx` | Flow diagram renderer | Call detail page |
| `ConversationTimeline.tsx` | Timeline of interactions | Call detail page |
| `AnalyticsCharts.tsx` | Charts and metrics | Analytics page |
| `StatsCards.tsx` | Summary statistics cards | Home page |
| `Filters.tsx` | Status filter buttons | Home page |

### UI Components (`components/ui/`)

Base shadcn/ui components.

| File | Purpose | Exports |
|------|---------|---------|
| `card.tsx` | Card containers | Card, CardHeader, CardTitle, CardContent, CardFooter |
| `badge.tsx` | Status badges | Badge (with variants) |
| `table.tsx` | Data tables | Table, TableHeader, TableBody, TableRow, TableHead, TableCell |
| `button.tsx` | Buttons | Button (with variants and sizes) |

## 📚 Library Directory (`lib/`)

Core utilities and configurations.

| File | Purpose | Key Exports |
|------|---------|-------------|
| `supabase.ts` | Supabase client setup | `supabase` client instance |
| `types.ts` | TypeScript interfaces | `Call`, `StateTransition`, `Database` |
| `queries.ts` | Database query functions | `getCalls()`, `getCallById()`, `getAnalytics()`, `generateMermaidDiagram()` |
| `utils.ts` | Helper utilities | `cn()` for className merging |

### Query Functions

| Function | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `getCalls()` | limit, status, startDate, endDate | `Call[]` | Fetch filtered calls |
| `getCallById()` | callId | `{call, transitions}` | Fetch single call with transitions |
| `getAnalytics()` | days | Analytics object | Calculate metrics |
| `getStateTransitionStats()` | - | Transition stats | Aggregate transition data |
| `generateMermaidDiagram()` | transitions | Mermaid string | Generate flow diagram syntax |

## 🗄️ Scripts Directory (`scripts/`)

Utility scripts and SQL files.

| File | Purpose | How to Use |
|------|---------|------------|
| `sample-data.sql` | Sample test data | Run in Supabase SQL Editor |

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.0.4 | React framework |
| `react` | 18.2.0 | UI library |
| `react-dom` | 18.2.0 | React DOM renderer |
| `@supabase/supabase-js` | 2.39.0 | Supabase client |
| `mermaid` | 10.6.1 | Flow diagrams |
| `recharts` | 2.10.3 | Charts library |
| `date-fns` | 3.0.0 | Date formatting |
| `lucide-react` | 0.294.0 | Icons |
| `clsx` | 2.0.0 | Conditional classes |
| `tailwind-merge` | 2.2.0 | Merge Tailwind classes |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 5.x | TypeScript compiler |
| `@types/node` | 20.x | Node.js types |
| `@types/react` | 18.x | React types |
| `@types/react-dom` | 18.x | React DOM types |
| `tailwindcss` | 3.3.0 | CSS framework |
| `autoprefixer` | 10.x | CSS prefixer |
| `postcss` | 8.x | CSS processor |

## 🎯 Key File Relationships

### Data Flow
```
Database (Supabase)
    ↓
lib/supabase.ts (Client)
    ↓
lib/queries.ts (Query Functions)
    ↓
Components (CallsList, CallDetail, etc.)
    ↓
Pages (app/*.tsx)
    ↓
User Browser
```

### Component Dependencies
```
app/page.tsx
├── components/StatsCards.tsx
│   └── lib/queries.ts → getAnalytics()
├── components/Filters.tsx
└── components/CallsList.tsx
    └── lib/queries.ts → getCalls()

app/calls/[id]/page.tsx
└── components/CallDetail.tsx
    ├── lib/queries.ts → generateMermaidDiagram()
    ├── components/MermaidFlowChart.tsx
    └── components/ConversationTimeline.tsx

app/analytics/page.tsx
└── components/AnalyticsCharts.tsx
    └── lib/queries.ts → getAnalytics(), getStateTransitionStats()
```

### Type Flow
```
lib/types.ts (Interfaces)
    ↓
lib/queries.ts (Type annotations)
    ↓
components/*.tsx (Props and state)
    ↓
app/*.tsx (Server/Client components)
```

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
- Enables strict mode
- Configures path aliases (`@/*`)
- Sets up Next.js plugin

### Tailwind (`tailwind.config.ts`)
- Defines color scheme
- Sets up CSS variables
- Configures content paths

### Next.js (`next.config.js`)
- React strict mode enabled
- Default Next.js configuration

### PostCSS (`postcss.config.js`)
- Tailwind CSS plugin
- Autoprefixer plugin

## 📝 File Naming Conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| `*.tsx` | `CallsList.tsx` | React component with JSX |
| `*.ts` | `queries.ts` | TypeScript file (no JSX) |
| `*.css` | `globals.css` | CSS stylesheet |
| `*.md` | `README.md` | Markdown documentation |
| `*.sql` | `sample-data.sql` | SQL script |
| `*.json` | `package.json` | JSON configuration |
| `*.js` | `next.config.js` | JavaScript config |

## 🗂️ Directory Structure

```
phoneAgent-dashboard/
├── 📄 Configuration Files (8 files)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .gitignore
│   └── .env.local.example
│
├── 📚 Documentation (7 files)
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── QUICKSTART.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── PROJECT_SUMMARY.md
│   └── FILE_INDEX.md
│
├── 📱 App Directory (6 files)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── analytics/page.tsx
│   └── calls/[id]/page.tsx
│
├── 🧩 Components (11 files)
│   ├── Feature Components (7 files)
│   │   ├── CallsList.tsx
│   │   ├── CallDetail.tsx
│   │   ├── MermaidFlowChart.tsx
│   │   ├── ConversationTimeline.tsx
│   │   ├── AnalyticsCharts.tsx
│   │   ├── StatsCards.tsx
│   │   └── Filters.tsx
│   │
│   └── UI Components (4 files)
│       ├── card.tsx
│       ├── badge.tsx
│       ├── table.tsx
│       └── button.tsx
│
├── 📚 Library (4 files)
│   ├── supabase.ts
│   ├── types.ts
│   ├── queries.ts
│   └── utils.ts
│
└── 🗄️ Scripts (1 file)
    └── sample-data.sql

Total: 37 source files + node_modules
```

## 🔍 Finding Files

### By Feature

**Home Page / Calls List**
- `app/page.tsx`
- `components/CallsList.tsx`
- `components/StatsCards.tsx`
- `components/Filters.tsx`

**Call Detail**
- `app/calls/[id]/page.tsx`
- `components/CallDetail.tsx`
- `components/MermaidFlowChart.tsx`
- `components/ConversationTimeline.tsx`

**Analytics**
- `app/analytics/page.tsx`
- `components/AnalyticsCharts.tsx`

**Database**
- `lib/supabase.ts`
- `lib/queries.ts`
- `lib/types.ts`

**Styling**
- `app/globals.css`
- `tailwind.config.ts`
- `components/ui/*.tsx`

### By Purpose

**Configuration**: Root directory `*.json`, `*.js`, `*.ts` files
**Documentation**: Root directory `*.md` files
**Pages**: `app/**/*.tsx` files
**Components**: `components/**/*.tsx` files
**Logic**: `lib/**/*.ts` files
**Data**: `scripts/**/*.sql` files

## 📊 File Statistics

- **Total Source Files**: 37
- **TypeScript Files**: 25
- **Documentation Files**: 7
- **Configuration Files**: 8
- **SQL Scripts**: 1
- **CSS Files**: 1

## 🎯 Quick Reference

### Need to...

**Add a new page?** → Create in `app/` directory
**Add a component?** → Create in `components/` directory
**Add a database query?** → Add to `lib/queries.ts`
**Add a type?** → Add to `lib/types.ts`
**Change styling?** → Edit `app/globals.css` or `tailwind.config.ts`
**Add documentation?** → Create `*.md` file in root
**Add sample data?** → Edit `scripts/sample-data.sql`

---

**This index covers all project files.** Use it as a reference when navigating the codebase.
