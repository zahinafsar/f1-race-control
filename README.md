# Apex Racing

Live F1 pit-wall dashboard: circuit map, race events, car diagnostics, driver vitals, engine telemetry, weather.

## 1. How to run

```bash
git clone https://github.com/zahinafsar/f1-race-control.git
cd f1-race-control
npm install
npm run dev
```

Dev server: **http://localhost:5173**

## 2. Overview

A race-control screen for a race engineer at Apex Racing. It shows one driver at a time: position and lap progress on the circuit map, car and tyre data on the car diagram, heart rate, breathing and stress as charts, plus weather and a live event feed. All data is simulated in the browser. There is no backend. The main idea is a screen you can read at a glance, so nothing scrolls on desktop and the only thing you interact with is a tyre (hover greys the car and shows that corner's numbers, click keeps it open).

## 3. Architecture

```
src/
├── main.tsx        six providers wrapping <RaceDashboard />
├── index.css       @theme tokens + @layer components (keyframes, gradients)
├── context/        *-hook.tsx = context + typed useX() that throws
│                   *-provider.tsx = interval + state + useMemo'd value
├── component/      presentational; race-dashboard.tsx is the shell
└── data/           track polyline, tyre thresholds, labels, assets
```

## 4. Live data simulation

**Tick rates** 

| Stream | Interval |
| --- | --- |
| Car positions + lap clock | 100 ms |
| Car, tyres, engine, brakes | 500 ms |
| Driver vitals | 500 ms |
| Race events | 1000 ms |
| Weather | 1000 ms |

**Trends and spikes:** Vitals repeat fixed patterns with a built-in heart-rate spike, while car and weather values drift randomly around a base value.

**Events:** One of 11 preset messages is added each second, newest first, capped at 60.

**Driver switching:** All three panels animate out and remount, which clears the pinned tyre and swaps the car, driver and race stats.

## 5. Responsive strategy

**Mobile (< 768px):** Three tabs, one panel at a time. Engine bars sit under the car. Weather in 2 columns.

**Tablet (768px+):** Tabs gone, all panels visible in a 2-column grid. Driver panel spans the top row and the engine bars move into it. Weather in 3 columns.

**Desktop (1280px+):** Three full-height columns fill the screen, so nothing scrolls. Vitals cards scroll inside their own column. Weather in 5 columns.

**Car:** Sizes itself from the image ratio, so the tyre spots stay aligned at any width, not just at breakpoints.

## 6. Challenges and pitfalls

- **Designing a layout for each device.** Three real layouts, not one that shrinks. Desktop was the hard one: a no-scroll screen needs `min-h-0` on every panel or flex children refuse to shrink and the page overflows.
- **Making the simulation feel smooth.** Used five separate intervals instead of one shared tick, so position moves at 100ms while weather updates at 1s, and turned off chart animation since it never finishes before the next tick.
- **Building the tyre interaction.** Hardest part. Each tyre is two boxes (a 56px hover target and 270px artwork) that must stay aligned while the car scales. Tried container units, CSS variables and precomputed values before plain percentages worked. Click-to-pin then forced the hover state up a level, since the car image is a sibling of the tyre boxes.

## 7. Trade-offs

**No true screen-to-screen transition on driver change.** The proper way is to hold two driver views at once, load the incoming one in the background, and then swap the two with a smooth transition. That is a lot more complexity and some performance cost, so instead there is a single view that swaps its data, timed with a small delay so the change lands mid-animation.

## 8. Performance notes


- **Split state into six providers, one per tick rate** — the main decision. A single 100ms store would re-render every consumer 10×/s including the weather strip that changes once.
- **Capped every growing array** — vitals `.slice(-60)`, events `.slice(0, 60)`. Otherwise an hour accrues 7,200 samples and 3,600 nodes.
- `useMemo` on provider values, `useCallback` on `selectPlayer` for a stable debounce identity.

**Consciously skipped**

- **No `React.memo`.** The 100ms tick rebuilds `CircuitPanel`'s 42-point path each time. Cheap here, and memo needs provider values memoized internally first to have any effect.
- **Per-render aggregation in telemetry cards** — `Math.min`/`Math.max`/`.map()` over 60 samples, 3 cards, every 500ms. Trivial at n=60; first `useMemo` candidate if the window grew.
- **No virtualization** on the 60-row event list.
- **No rAF throttling, no pause on tab blur.** All five intervals run hidden. Correct for a wall display, wasteful on a laptop; a `visibilitychange` listener is the obvious next step.

## 9. Tools used

- Vite (build tool)
- React (UI framework)
- TypeScript (language)
- Tailwind CSS (styling)
- Recharts (charts)
- Motion (animation)
- Lucide (icons)
- date-fns (time formatting)
- Geist (font)
- ESLint (code checks)
- Netlify (hosting)

**AI tools:** Used Claude Code as a reviewer and refactoring, not to generate features.
