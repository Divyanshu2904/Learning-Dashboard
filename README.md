# LearnOS — Next-Gen Student Dashboard

A futuristic, highly animated student learning dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## Live Demo

> Deploy to Vercel and paste your URL here.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** (App Router) | Framework with RSC support |
| **Supabase** | PostgreSQL database + BaaS |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Physics-based animations |
| **Lucide React** | Icon library |
| **TypeScript** | Type safety |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
3. Go to **Settings → API** and copy your project URL and anon key

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

> **Note:** If you skip Supabase setup, the dashboard still works with built-in mock data.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture Decisions

### Server vs Client Component Split

```
app/page.tsx                  ← Server Component (data fetching)
  └─ DashboardShell           ← Server Component (layout)
       ├─ Sidebar             ← Client Component (interactive state)
       ├─ MobileNav           ← Client Component (interactive state)
       ├─ TopBar              ← Client Component (animations)
       └─ BentoGrid           ← Client Component (Framer Motion)
            ├─ HeroTile       ← Client Component (animations)
            ├─ CourseTile     ← Client Component (animations + progress)
            ├─ ActivityTile   ← Client Component (contribution graph)
            ├─ StatsTile      ← Client Component (hover animations)
            └─ QuickActionsTile ← Client Component (motion buttons)
```

**Why this split?**
- `app/page.tsx` is a **Server Component** — it fetches Supabase data at the server level, so no API keys are exposed to the browser and the client receives pre-rendered HTML.
- All interactive components (`"use client"`) are pushed to the leaves of the tree, keeping the server component boundary as high as possible.
- Framer Motion requires client-side JavaScript, so all animated tiles are Client Components.

### Data Fetching Strategy

- Data is fetched in `app/page.tsx` using `async/await` — a Next.js Server Component
- The `createServerClient()` utility creates a Supabase client with `persistSession: false` (safe for server use)
- If Supabase credentials are missing or the query fails, the app **gracefully falls back** to mock data — no crashes
- `React.Suspense` wraps the dashboard with a full skeleton loader

### Animation Strategy (Zero Layout Shifts)

All animations use **only `transform` and `opacity`** — properties that are GPU-composited and never trigger browser repaints or layout recalculations:

- **Staggered entrance**: `staggerChildren` in Framer Motion `variants`
- **Hover elevate**: `scale: 1.02` via `whileHover` (transform, never margin/padding)
- **Progress bars**: width animated via Framer Motion (contained element, not affecting layout)
- **Sidebar expand**: `width` animation via Framer Motion (sibling elements use `flex`, so no repaint)
- **Nav highlight**: `layoutId="nav-active-bg"` for smooth shared-element transition

### Spring Physics

All interactive animations use `type: "spring"` with `stiffness: 300, damping: 20` for a natural, non-linear feel that avoids mechanical easing curves.

---

## Responsive Behavior

| Breakpoint | Sidebar | Grid |
|-----------|---------|------|
| `< 768px` (mobile) | Bottom navigation bar | Single column |
| `768–1024px` (tablet) | Icon-only collapsed sidebar | 2-column grid |
| `> 1024px` (desktop) | Expandable full sidebar | 3-column Bento grid |

---

## Challenges Faced

1. **Dynamic Lucide icons from database**: The `icon_name` field stores a string like `"Code2"`. Resolved by importing all of `lucide-react` as `* as LucideIcons` and dynamically indexing by key — with a fallback to `BookOpen`.

2. **Framer Motion + Server Components**: Framer Motion requires the DOM, so it can't run in RSCs. The solution is to keep data fetching in Server Components and pass the fetched data down as props to Client Component leaves.

3. **Skeleton loading with Suspense**: `loading.tsx` in Next.js App Router automatically becomes the Suspense fallback for the route segment. The skeleton mirrors the exact layout of the dashboard to prevent visual jumps on data load.

---

## Deployment

```bash
# Build locally first to catch errors
npm run build

# Deploy to Vercel
npx vercel --prod
```

Set your environment variables in Vercel dashboard under **Settings → Environment Variables**.
