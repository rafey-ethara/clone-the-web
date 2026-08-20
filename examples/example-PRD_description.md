# Ledgra home page — in plain language

The companion to `PRD.md`. That document tells a developer *how* to build the page,
in exact numbers. This one tells you *what it is* and *what it will cost you*.

No code, no colour codes, no measurements. If you are paying for this build or deciding
whether to attempt it, read this and skip the other one.

---

## 1. What this is

A single long scrolling home page for a made-up payments company called **Ledgra**.
The company sells four money products — issuing cards, taking card payments, running
credit programmes, and moving money between accounts — and its whole sales argument is
that these four things sit on *one* system rather than being four companies stitched
together.

The page exists to convince a technical buyer of exactly that, and then push them
toward one of two buttons: start using it, or talk to a salesperson.

**Ledgra is a placeholder name.** So is every customer, partner and quote on the page.
They were invented so the layout has realistic-length words in it. Swap them freely.

---

## 2. What it feels like

The whole page sits on a warm off-white, like unbleached paper rather than a screen.
Nothing is pure white except the cards, which makes them read as physical objects
resting on that paper.

Then there is one enormous burst of colour at the very top — a huge glowing orb in
cyan, green and acid yellow, filling the entire first screen and bleeding off both
edges. It is the only loud thing on the page. After you scroll past it, the page goes
quiet and stays quiet, until a soft echo of the same colours appears right at the
bottom as a farewell.

The type is very large and very plain. Headlines run enormous — three or four words
filling the width of the screen — in a neutral typeface with no personality of its own.
Nothing is italic, nothing is coloured, nothing is decorative. The restraint everywhere
else is what lets the orb work.

**The motion is ambient, not reactive.** Things breathe, drift and loop constantly on
their own. Nothing waits for you to scroll to it and then jumps. The page is alive when
you arrive and stays alive whether or not you touch it — closer to a lava lamp than to
a slideshow. This is unusual, and it is most of the page's character.

The one thing that *does* respond to you: every card lifts slightly when you point at
it and reveals a small arrow, as though you had picked up a piece of paper.

---

## 3. The page, top to bottom

1. **A thin promo strip** across the very top — one line of text advertising a guide,
   with an arrow that shuffles right when you point at it.

2. **The navigation bar.** Logo on the left, six menu items centred, two buttons on the
   right. Three of the six menu items open a small white panel when you hover over
   them. Worth knowing: **this bar scrolls away and never comes back.** It does not
   stick to the top. That is a deliberate choice, not an oversight.

3. **The hero.** The orb, and over it a headline that reads *"[something] Built for
   You."* — where the first word cycles: Issuing, Acquiring, Credit, Money Movement,
   Real-Time Ledgering, Ledgra. Each word rises from below, sits for about two seconds,
   then slides up and out as the next arrives. Below that, a sentence of explanation and
   two pill-shaped buttons.

4. **A wall of customer logos** — twelve names in two rows, small and grey, under the
   line "trusted by the companies building what's next in payments".

5. **The four products.** Four tall white cards side by side, each with a title, a line
   of description, and an elaborate illustration filling its lower half — a green
   payment card, a floating checkout form, a credit approval receipt, and a scrolling
   list of payment methods. These illustrations are drawn, not photographed, and each
   has soft colour drifting behind it.

6. **A wiring diagram.** Thin hairlines drop out of the bottom of those four cards,
   merge onto a horizontal rail, and fan back out into eight small grey tiles naming
   platform capabilities. Faint pulses of light travel along the lines continuously, so
   it reads as a live system rather than a static chart.

7. **The thesis.** More hairlines converge from those eight tiles down into a single
   glowing green disc with colours slowly orbiting inside it. Under it: *"Built on a
   Unified Platform"*, and three short benefit columns.

8. **Eight industry cards** — AP & Bill Pay, Fleet, Travel, and so on — each with a
   title, a line of copy, and a square image. The image pushes in slightly when you
   hover.

9. **Customer proof.** Two large black video tiles side by side, then four square white
   cards each holding a single customer quote with their logo pinned to the bottom.

10. **The developer pitch.** Copy and four small feature blocks on the left; on the
    right, a tall dark panel that looks like a code editor and continuously types out a
    request and its response, complete with a blinking cursor. It loops forever.

11. **Three article cards** with soft coloured artwork and headlines beneath.

12. **The closing pitch** — *"Build what's next"* — with the same two buttons, and
    beneath them a wide blurred aurora of the hero's colours slowly rippling.

13. **A black footer** with five columns of links, a legal paragraph, and a large,
    deliberate expanse of empty space above it.

---

## 4. Effects, and how hard they are

Hardest first. One dot is an afternoon, two is a day or two, three is a week or more.

| Effect | Effort | Built with | What you actually see |
|---|---|---|---|
| The hero orb | ●●● | Hand-drawn vector shapes with layered colour washes, each on its own slow timer | Nine enormous rings of light rising from below the screen, tinted cyan with green bleeding in from the upper right and yellow from the lower left. Each ring drifts independently on a cycle 20–30 seconds long, so the shape never repeats for minutes at a time. |
| The four product illustrations | ●●● | Hand-drawn vector art with soft-focus blur effects | A green payment card, a checkout form mid-payment, a credit approval receipt, and a scrolling list of payment rails. Each has a large blurred blob of colour drifting slowly behind it, which is what makes plain white cards feel warm. |
| The two wiring diagrams | ●●● | Hand-drawn line art that draws itself, then loops | Thin lines that sketch themselves onto the page when it loads — stems dropping from cards, sweeping along a rail, fanning into tiles — after which small pulses of light travel the routes forever. The routes deliberately cross, because each product feeds several capabilities. |
| The glowing platform disc | ●●● | Vector shapes with blur, several independent orbits | A green disc with four soft colour blobs orbiting inside it at different speeds, each also breathing in and out on its own separate rhythm. On phones this is replaced by a plain gradient, because the blur is too expensive for small devices. |
| The code panel that types itself | ●● | A small amount of custom logic on a timer | A dark editor panel that reveals a request one line every fraction of a second, pauses, then reveals the response faster, holds for five seconds and starts over. A cursor blinks on whichever line is currently being written. |
| The cycling headline word | ●● | Plain styling, on a timer | One word above the headline changes every two and a half seconds — each rises from below, holds, then slides up and out. Only ever one word visible. |
| The self-filling checkout form | ●● | Plain styling, on a timer | Inside one product card, a card number types itself in four groups. Partway through, three of the four card-brand badges fade away and the remaining one slides across to take their place, as if the form had recognised the card. |
| The endless list of payment rails | ●● | Plain styling, on a timer | A column of small labelled chips scrolling slowly upward forever, fading out at the top. It never visibly restarts, which is why the list is secretly printed twice. |
| The closing aurora | ●● | A vector shape that morphs between drawn states | A wide band of blurred colour under the last section, its silhouette slowly rippling between four shapes on an eight-second loop. |
| The video tiles | ●● | Video, plus a pop-up panel | Two black tiles with a partner logo and a play button. Clicking one dims the page and opens the full video. Dismissed by clicking away, the close button, or Escape. |
| The menu dropdowns | ● | Plain styling | Hovering a menu item fades a small white panel in while it rises slightly. There is an invisible strip bridging the gap so the panel does not vanish as your cursor travels toward it. |
| Cards lifting on hover | ● | Plain styling | The card floats up slightly, gains a soft paper-like shadow, and a small arrow slides in beside the title. |
| Industry images pushing in | ● | Plain styling | The photograph inside the card scales up slightly within its rounded frame, so it feels like leaning closer. Deliberately disabled on touchscreens. |
| Footer link arrows | ● | Plain styling | A small arrow slides in beside a link on hover — the quickest movement on the page. |
| The promo strip | ● | Plain styling | The strip darkens slightly and its arrow shuffles right. |

---

## 5. What is genuinely hard

**The illustrations, by a wide margin.** Four of the five three-dot rows above are
drawings — the orb, the product cards, the wiring diagrams, the disc. Every one is
built from shapes, gradients and blurs described coordinate by coordinate. There is no
clever technique to learn; there is simply a lot of exact geometry, and being slightly
off looks obviously wrong. Budget most of the time here.

**The ambient motion is fiddly rather than difficult.** Nine rings drifting on nine
different cycles is not hard to write, but it is easy to get subtly wrong — if the
timings are too similar the whole thing pulses in unison and reads as cheap.

**Two things look simple and are not:**

- *The scrolling rail list* has to be printed twice or it visibly jumps every time it
  loops. Obvious once you know; invisible until someone spots the stutter.
- *The typing code panel* is the only piece needing real programmatic logic. Everything
  else on the page is styling.

**One thing looks hard and is not:** the hero headline that cycles words. It is six
words stacked on top of each other, each fading in and out on a delay. No cleverness
required.

**Mobile is cheaper than you would guess.** Below tablet size, the drifting orb, the
card blobs and the orbiting disc all switch off, and the wiring diagrams disappear
entirely. Roughly a third of the expensive work simply does not run on a phone.

**A warning about the typeface.** The original uses a commercial font that costs money
and cannot legally be copied from the original site. The spec substitutes a free
lookalike. It is very close, but not identical, and if you want an exact match you must
buy a licence.

---

## 6. Jargon, translated

Terms you will meet in `PRD.md`.

| Term | What it means |
|---|---|
| **Design token** | A named value like "the page background colour", defined once and reused everywhere, so changing it changes the whole site at once. |
| **Type scale** | The fixed set of text sizes a site allows. This site invented its own instead of using its toolkit's defaults — which matters enormously, because a builder who assumes the defaults gets every heading wrong. |
| **Utility framework** | A styling toolkit where you describe an element by stacking short labels ("white background", "big padding") rather than writing style rules by hand. |
| **Viewport** | The visible area of the browser window. Not the same as screen size. |
| **Breakpoint** | A width at which the layout changes shape — for example four columns becoming one on a phone. |
| **Vector graphic (SVG)** | A picture defined as instructions — "circle here, this big, this colour" — rather than as a grid of pixels. Stays sharp at any size and can be animated and recoloured. That is why every image in this spec is one. |
| **Gradient** | A smooth fade between colours. Every coloured surface on this page is one of these rather than a photograph. |
| **Keyframes** | A list of what an animation should look like at points through its run — start here, be here a third of the way through, end there. The browser fills in the rest. |
| **Easing** | How an animation distributes its speed. Real movement starts slowly, accelerates, and settles. Linear motion looks mechanical, and it is the most common giveaway of an amateur build. |
| **Hover state** | How something looks while the pointer is over it. Touchscreens have no pointer, so these are switched off there deliberately. |
| **Mask** | Using one shape to decide which parts of another are visible — like a stencil. Used to clip the orb to the top of the page. |
| **Blur / Gaussian blur** | Softening an image. Used heavily here for glowing colour, and it is expensive to compute, which is why it is turned off on phones. |
| **Aspect ratio** | The shape of a box regardless of size — "twice as tall as it is wide". Used to keep cards proportional across screen sizes. |
| **Loops forever / plays once** | Whether an animation repeats indefinitely or runs a single time on load. The drifting is forever; the line-drawing is once. |
| **Server rendering vs. client rendering** | Whether the page arrives pre-built from the server or is assembled in the visitor's browser. Almost all of this page is pre-built, which makes it fast. |
| **Retina / high-density display** | Screens packing extra pixels into the same space. Images need care here, or they render at half the intended size. |
| **Placeholder brand** | An invented name standing in for the real one, so nobody building from the spec learns whose site it was. |
