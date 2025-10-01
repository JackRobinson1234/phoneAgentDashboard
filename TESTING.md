# Testing Checklist

Use this checklist to verify your Phone Agent Analytics Dashboard is working correctly.

## Pre-Deployment Testing

### Environment Setup
- [ ] `.env.local` file exists with correct values
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] Dependencies installed (`npm install` completed)
- [ ] No TypeScript errors (`npm run build` succeeds)

### Database Connection
- [ ] Supabase project is active
- [ ] Tables `calls` and `state_transitions` exist
- [ ] Sample data is loaded (optional: run `scripts/sample-data.sql`)
- [ ] Row Level Security (RLS) allows read access

## Functional Testing

### Home Page (`/`)
- [ ] Page loads without errors
- [ ] Stats cards display correctly
  - [ ] Total Calls (7d)
  - [ ] Completion Rate
  - [ ] Avg Duration
  - [ ] Total Tokens
- [ ] Filters render (All, Completed, Error, In Progress)
- [ ] Calls table displays with columns:
  - [ ] Session ID
  - [ ] Status badge (with correct colors)
  - [ ] Duration
  - [ ] States
  - [ ] Tokens
  - [ ] Time (relative, e.g., "2 hours ago")
  - [ ] "View Details" link
- [ ] Empty state shows if no calls exist
- [ ] Loading states appear briefly

### Call Detail Page (`/calls/[id]`)
- [ ] Click "View Details" navigates to detail page
- [ ] Call info cards display:
  - [ ] Status badge
  - [ ] Duration
  - [ ] LLM Calls
  - [ ] Tokens Used
- [ ] Mermaid flow chart renders
  - [ ] Shows state transitions as nodes
  - [ ] Arrows connect states
  - [ ] Labels show context updates
- [ ] Conversation timeline displays:
  - [ ] Sequence numbers (1, 2, 3...)
  - [ ] State transitions (FROM → TO)
  - [ ] Transition type badges
  - [ ] User input (blue background)
  - [ ] Agent response (green background)
  - [ ] Context updates (if any)
  - [ ] Metadata (model, tokens, time, timestamp)
- [ ] Invalid call ID shows 404 page

### Analytics Page (`/analytics`)
- [ ] Page loads without errors
- [ ] Summary cards display:
  - [ ] Total Calls
  - [ ] Completion Rate (%)
  - [ ] Avg Duration (seconds)
  - [ ] Total Tokens
- [ ] "Top State Transitions" chart renders
  - [ ] Bar chart displays
  - [ ] X-axis shows transition names
  - [ ] Y-axis shows counts
  - [ ] Legend shows "Frequency" and "Avg Time (ms)"
  - [ ] Bars are colored correctly
- [ ] "Calls Over Time" chart renders
  - [ ] Line chart displays
  - [ ] X-axis shows dates
  - [ ] Y-axis shows duration
  - [ ] Line connects data points

### Navigation
- [ ] "Phone Agent Analytics" logo links to home
- [ ] "Calls" link navigates to home page
- [ ] "Analytics" link navigates to analytics page
- [ ] Browser back/forward buttons work
- [ ] Active page is visually indicated (optional)

## UI/UX Testing

### Responsive Design
- [ ] Desktop (1920x1080): Layout looks good
- [ ] Laptop (1366x768): No horizontal scroll
- [ ] Tablet (768x1024): Cards stack properly
- [ ] Mobile (375x667): Single column layout
- [ ] Navigation is accessible on mobile

### Visual Design
- [ ] Tailwind CSS styles applied
- [ ] Cards have proper shadows and borders
- [ ] Badges have correct colors:
  - [ ] `completed` = green
  - [ ] `error` = red
  - [ ] `in_progress` = gray
- [ ] Typography is readable
- [ ] Spacing is consistent
- [ ] Colors match design system

### Performance
- [ ] Initial page load < 3 seconds
- [ ] Navigation between pages is smooth
- [ ] Charts render without lag
- [ ] No console errors in browser
- [ ] Images/assets load correctly

## Data Validation

### Calls Data
- [ ] Call IDs are unique
- [ ] Session IDs display correctly
- [ ] Timestamps are formatted properly
- [ ] Duration calculations are accurate
- [ ] Token counts are reasonable
- [ ] Status values are valid

### State Transitions
- [ ] Transitions are ordered by sequence_number
- [ ] from_state and to_state are correct
- [ ] User input and agent response display
- [ ] Context updates parse correctly (JSON)
- [ ] LLM model names display
- [ ] Processing times are in milliseconds

### Edge Cases
- [ ] Empty database shows appropriate message
- [ ] Call with no transitions handles gracefully
- [ ] Very long user input/response doesn't break layout
- [ ] Special characters in text display correctly
- [ ] Null values are handled (e.g., duration_seconds)

## Error Handling

### Network Errors
- [ ] Supabase connection failure shows error
- [ ] Retry mechanism works (if implemented)
- [ ] Error messages are user-friendly

### Invalid Data
- [ ] Invalid call_id shows 404 page
- [ ] Malformed JSON in context doesn't crash app
- [ ] Missing required fields are handled

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Security Testing

### Environment Variables
- [ ] `.env.local` is gitignored
- [ ] No secrets in client-side code
- [ ] Only anon key is used (not service role key)

### Supabase Security
- [ ] RLS policies are enabled
- [ ] Anon key has read-only access
- [ ] No sensitive data exposed in API responses

## Deployment Testing (Post-Deploy)

### Vercel Deployment
- [ ] Build succeeds on Vercel
- [ ] Environment variables are set in Vercel
- [ ] Production URL is accessible
- [ ] HTTPS is enabled
- [ ] Custom domain works (if configured)

### Production Verification
- [ ] All pages load on production URL
- [ ] Data fetches from Supabase
- [ ] Charts render correctly
- [ ] No console errors
- [ ] Analytics tracking works (if enabled)

## Performance Monitoring

### Metrics to Track
- [ ] Page load time
- [ ] Time to First Byte (TTFB)
- [ ] Largest Contentful Paint (LCP)
- [ ] First Input Delay (FID)
- [ ] Cumulative Layout Shift (CLS)

### Optimization Checks
- [ ] Images are optimized
- [ ] JavaScript bundles are minimized
- [ ] CSS is purged (unused styles removed)
- [ ] Database queries are efficient
- [ ] Caching is configured

## Accessibility Testing

### WCAG Compliance
- [ ] Color contrast meets AA standards
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators are visible
- [ ] Alt text for images (if any)

## Documentation Review

- [ ] README.md is complete
- [ ] QUICKSTART.md is accurate
- [ ] DEPLOYMENT.md has correct steps
- [ ] Code comments are helpful
- [ ] Environment variables are documented

## Final Checks

- [ ] All features from spec are implemented
- [ ] No critical bugs remain
- [ ] Performance is acceptable
- [ ] User experience is smooth
- [ ] Ready for production use

---

## Bug Report Template

If you find issues, document them:

**Bug Title**: [Brief description]

**Steps to Reproduce**:
1. Go to...
2. Click on...
3. See error

**Expected Behavior**: [What should happen]

**Actual Behavior**: [What actually happens]

**Screenshots**: [If applicable]

**Environment**:
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- URL: [e.g., localhost:3000 or production URL]

**Console Errors**: [Copy any errors from browser console]

---

**Testing Complete!** ✅

Once all items are checked, your dashboard is ready for deployment.
