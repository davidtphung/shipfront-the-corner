# The Crate motion spec

Easing
- Enter: cubic-bezier(0.22, 1, 0.36, 1)
- Standard: cubic-bezier(0.16, 1, 0.3, 1)

Timing
- Micro (buttons, chips, tabs): 120-220ms
- Component (panels, tables, cards): 260-450ms
- Section choreography: 600-1000ms

Hero
1. Horizon glow fades in.
2. Headline rises 28px with a clip, 800ms.
3. Route paths draw 1.1s, staggered 150ms.
4. Nodes scale in with a short spring.
5. Selected shipment panel springs from the right.
6. Event line crossfades every 2.8s.
7. CTAs fade and rise with the copy stack.

Why cards
- Enter on viewport, 450ms, 80ms stagger.
- Hover: lift 8px, border brightens.
- Mini systems tiles drift and settle into one panel.
- Delay card cycles warning to cyan to green.

Product mocks
- Shipment list uses shared selection, no page reload.
- Booking chips reorder the table in place.
- Exception card opens suggested work on press.
- Document scan resolves missing items without height jump on the page frame.
- Analytics bars grow from baseline on first view.

Intelligence
- Query types at 18ms per character.
- Answer streams at 10ms per character.
- Action toolbar is static and keyboard reachable.

Journey
- Crate follows the route path in a 10s loop.
- Reduced motion: path stays, crate does not travel.

Nav
- 300ms morph into a floating shell after 18px of scroll.

Reduced motion
- No loops, no path travel, no typewriter.
- Content is visible at rest.
- Focus states stay 2px cyan.
