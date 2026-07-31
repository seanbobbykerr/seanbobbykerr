# Design direction — seanbobbykerr.com

Status: proposal. No code written. Supersedes nothing; this is the first design document for the site.

Written against `CLAUDE.md` and `brand_assets/README.md`, using the `frontend-design` skill's process. Every colour comes from the eight sampled values. No new hexes are introduced anywhere in this document.

Two constraints shaped this more than anything else:

- **There is no front cover artwork.** The hero is carried by type, the frame motifs and colour. Cover slots are defined below so art can drop in later without a rebuild.
- **The frame art is bronze linework drawn on white.** A dark site cannot simply place those files on a dark ground and expect them to read. This is handled per-asset below and is the main build risk.

---

## 1. Colour

### The finding that drives the system

The palette will not give you two text colours and two background colours in the way most palettes do. Measured against a dark ground, the blues fail as ink and the golds fail as surfaces. Contrast ratios, computed from the sampled values:

| Foreground | On Ink `#000000` | On Deep blue `#1E2C4B` | Verdict |
|---|---:|---:|---|
| Parchment `#E1D0B1` | **13.9:1** | **9.1:1** | Body text. AAA on both. |
| Gold highlight `#F4B039` | **11.1:1** | **7.3:1** | Emphasis and links. AAA on both. |
| Gold field `#BF8C32` | 7.0:1 | 4.6:1 | Secondary text on Ink only. |
| Bronze shadow `#A17529` | 5.1:1 | 3.4:1 | Rules, borders, labels. Not body text. |
| Blue highlight `#2D4FA0` | 2.7:1 | — | **Fails as text anywhere.** Surface only. |
| Blue field `#2F4989` | 2.0:1 | — | **Fails as text anywhere.** Surface only. |
| Deep blue `#1E2C4B` | 1.5:1 | — | Raised surface above Ink. |

So the answer to "how do you get accessible body text out of a palette this saturated" is: **you don't take text out of the saturated colours at all.** The blues become grounds and never ink. Parchment carries every word of running text. Gold marks emphasis. Bronze draws lines. That is the whole rule, and it happens to be exactly how the artist used the colours on the back cover — the blues are painted fields, the gold is light falling on things.

These are calculated values. I will verify them in-browser against rendered type before shipping, because antialiasing on thin serifs at small sizes costs effective contrast even when the maths passes.

### Tokens, named by role

```
--ground            #000000   Ink            page ground, above the seam
--ground-below      #1E2C4B   Deep blue      page ground, below the seam
--surface           #1E2C4B   Deep blue      raised panels on --ground
--surface-cool      #2F4989   Blue field     the one accent panel per page, at most
--rule              #A17529   Bronze shadow  hairlines, borders, the seam itself
--label             #A17529   Bronze shadow  eyebrows and small caps labels
--ink               #E1D0B1   Parchment      all running text
--ink-quiet         #BF8C32   Gold field     secondary text, captions, metadata
--accent            #F4B039   Gold highlight links, the single ask, current position
--field             #2D4FA0   Blue highlight form field ground, focus ring
```

Two of the eight — Blue highlight and Blue field — appear only as surfaces. That is deliberate, not an oversight.

### What carries the page, what is rare

**Carries the page:** Ink, Deep blue, Parchment, Bronze shadow. Four values do roughly ninety percent of the work. A visitor's overall impression should be near-black, parchment type, thin bronze lines.

**Used sparingly:** Gold highlight is capped at **three appearances per screen**. In practice that is the single call to action, the active nav item, and one link. If a fourth wants gold, something else has to give it up. This cap is what keeps a heavily gilded palette from reading as gaudy.

**Used once per page at most:** Blue field, as the surface under the page's single ask.

### On "ashen"

The brief asks for a dark, ashen palette. There is no grey in the eight values and I am not adding one. Ashen is achieved through low luminance and through starving the golds, not through a grey. The site should feel like a low fire in a cold room: mostly dark, a little warm light, and that light rationed.

---

## 2. Type

### Position on Alegreya: carry it, and carry the whole family

Yes, unreservedly. The brief's argument is correct and I would have proposed it unprompted. A reader who scans a code in the back of the paperback and lands on a page set in the same face is holding one object, not two. Almost no author site has that relationship to its own books. It is a real advantage and it costs nothing.

I want to go further than the brief asks. Rather than pairing Alegreya with a second family, use **the Alegreya superfamily across all three roles**. Alegreya, Alegreya SC and Alegreya Sans were drawn by the same designer with harmonised metrics, so this stays inside the "no more than two families" rule by any sensible reading, and it means the site has no typographic seam in it at all.

| Role | Face | Why |
|---|---|---|
| Display | **Alegreya SC** (small caps) | Titles set in small caps read as *inscribed* rather than typeset. For a trilogy that opens with a burned name, type that behaves like cut lettering is on the nose in the right way. And it is the book's own small-caps cut, not a lookalike. |
| Body | **Alegreya** | Designed by Huerta Tipográfica specifically for long-form fiction. It is what the books are set in. |
| Utility | **Alegreya Sans** | Nav, form fields, labels, captions. A sans at 13–15px is genuinely more legible than a serif, and it separates site furniture from the author's words. |

**What I deliberately did not do:** the default fantasy-author display face is Cinzel, with Cormorant and Marcellus close behind. All three are Roman inscriptional faces and all three would look competent here. They are also on a large share of fantasy author sites, and none of them are in the books. Alegreya SC gets to the same lapidary quality through the actual printed object.

### Scale

Body is 18px on mobile and 19px on desktop. That is larger than the usual 16px because this site's job is reading, and Alegreya has a moderate x-height that benefits from the extra size.

**Mobile (360–767px)**

| Token | Size / line-height | Face and weight | Tracking |
|---|---|---|---|
| `display-1` page title | 40px / 1.05 | Alegreya SC 800 | +0.02em |
| `display-2` section | 28px / 1.15 | Alegreya SC 700 | +0.04em |
| `h3` | 21px / 1.30 | Alegreya 700 | 0 |
| `lead` | 21px / 1.50 | Alegreya 400 | 0 |
| `body` | 18px / 1.65 | Alegreya 400 | 0 |
| `small` | 15px / 1.50 | Alegreya Sans 400 | 0 |
| `label` eyebrow | 12px / 1.20 | Alegreya Sans 600, uppercase | +0.18em |

**Desktop (1024px+)**

| Token | Size / line-height | Face and weight | Tracking |
|---|---|---|---|
| `display-1` | 76px / 1.00 | Alegreya SC 800 | +0.01em |
| `display-2` | 40px / 1.15 | Alegreya SC 700 | +0.03em |
| `h3` | 24px / 1.30 | Alegreya 700 | 0 |
| `lead` | 24px / 1.55 | Alegreya 400 | 0 |
| `body` | 19px / 1.70 | Alegreya 400 | 0 |
| `small` | 16px / 1.50 | Alegreya Sans 400 | 0 |
| `label` | 13px / 1.20 | Alegreya Sans 600, uppercase | +0.18em |

Fluid between breakpoints via `clamp()`. Measure capped at 34em, about 65 characters.

Note the tracking on `display-1`: **+0.01 to +0.02em, which is nearly tight.** The reflexive move with small caps is to open the tracking right up, which produces the airy, ceremonial fantasy-logo look. Setting it close instead makes the titles read as something cut into a surface with a chisel rather than a logo floating on a page. This connects to the author's own background — precise, engineered, not ornamental. It is a small decision that does a lot of work.

Loading: self-host the three families as WOFF2 subsets rather than calling Google Fonts, for speed and to avoid a third-party request. Roughly four files.

---

## 3. Layout

### The structural concept

Every page is divided once, horizontally, by a full-bleed seam. **Above the seam the work speaks. Below the seam the reader is asked to do something.** The ground colour changes across it — Ink above, Deep blue below — as a hard meeting, never a gradient. Exactly one element crosses the seam, and that element is always the page's single ask.

This is the Burning Divide used as layout grammar rather than decoration. It also enforces the brief's "one page, one job" rule structurally: there is precisely one crossing element per page, so a second competing call to action has nowhere to sit.

The seam is the only full-bleed element on the site. Everything else lives in a centred column, 34em for text, 62em for wider sections, with 20px gutters on mobile and 32px above.

### Home — mobile (360px)

```
┌──────────────────────────────┐
│  ≡            SEAN BOBBY KERR│  Alegreya Sans, bronze hairline under
├──────────────────────────────┤
│                              │
│ ───╱▔▔╲ eagle ╱▔▔╲────────── │  crown mark as masthead, its own
│                              │  rail continuing as the rule
│  T H E   M A E L U M         │  Alegreya SC 800, parchment
│  T R I L O G Y               │  ranged left, tight tracking
│                              │
│  TODO: Sean's positioning    │  one line, lead size
│  line. One sentence.         │
│                              │
│                              │
│◈─────◇─────◈─────◇─────◈─────│  THE SEAM — full bleed, bronze
│┌────────────────────────────┐│
││ Join the mailing list      ││  crosses the seam
││ [ email           ] [  →  ]││  TODO: provider not chosen —
│└────────────────────────────┘│  placeholder, no embed
│                              │
│  ▓ ground is now Deep blue ▓ │
│                              │
│  T H E   B O O K S           │
│                              │
│  BOOK ONE                    │  full weight — the book exists
│  The Burned Name             │  display-2, parchment
│  TODO: one-line hook         │
│  ──────────────────────────  │
│  BOOK TWO                    │  reduced — written, not out
│  The Scroll of Recall        │  h3, parchment
│  TODO: one line              │
│  ──────────────────────────  │
│  BOOK THREE                  │  lowest — not yet named
│  ┌──────────────────────┐    │  the empty cartouche
│  │                      │    │  (see Signature, below)
│  └──────────────────────┘    │
│  TODO: Sean's line about     │
│  the title being withheld    │
│                              │
│  ──────────────────────────  │  plain hairline, no chain
│  Books · About · Contact     │
│  Sydney, Australia           │
└──────────────────────────────┘
```

Above the fold on a 360×640 phone: masthead, title, positioning line, seam and the top of the signup block land inside the first screen provided the crown mark is held to about 110px tall. That is the constraint that sets the mark's size, not aesthetics.

### Home — desktop (1200px)

```
┌──────────────────────────────────────────────────────────────┐
│ SEAN BOBBY KERR                  Books   About   Newsletter   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ──────────────╱▔▔▔╲ eagle ╱▔▔▔╲───────────────────────────── │
│                                                              │
│   T H E   M A E L U M   T R I L O G Y                        │
│                                                              │
│   TODO: Sean's positioning line.                             │
│                                                              │
│                                                              │
│◈════◇════◈════◇════◈════◇════◈════◇════◈════◇════◈════◇════◈│  full bleed
│        ┌────────────────────────────────────┐                │
│        │ Join the mailing list              │                │
│        │ [ email                ] [  Join ] │                │
│        └────────────────────────────────────┘                │
│  ▓▓▓▓▓▓▓▓▓ ground is Deep blue below the seam ▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                                              │
│   T H E   B O O K S                                          │
│                                                              │
│   ┌──┐  BOOK ONE                                             │
│   │cv│  The Burned Name                                      │
│   └──┘  TODO: one-line hook                                  │
│   ─────────────────────────────────────────────              │
│   ┌──┐  BOOK TWO                                             │
│   │cv│  The Scroll of Recall                                 │
│   └──┘  TODO: one line                                       │
│   ─────────────────────────────────────────────              │
│         BOOK THREE                                           │
│         ┌────────────────┐                                   │
│         │                │   empty cartouche                 │
│         └────────────────┘                                   │
│                                                              │
│   ──────────────── bronze hairline ─────────────             │
│   Books  About  Contact  Media kit      Sydney, Australia    │
└──────────────────────────────────────────────────────────────┘
```

`cv` marks a collapsed cover slot. See section 5.

Note the books are a **descending run, not three equal cards**. Book one is complete, book two is written and unreleased, book three is unnamed. They are rendered at the weight of certainty each actually has. A reader gets the state of the trilogy in about two seconds without reading a word of copy.

### /book1 — mobile

The reader arriving here has just closed *The Burned Name* and turned to the back matter. The page should acknowledge that, then make one ask.

```
┌──────────────────────────────┐
│  ≡            SEAN BOBBY KERR│
├──────────────────────────────┤
│                              │
│  BOOK TWO OF THE MAELUM      │  label, bronze
│  TRILOGY                     │
│                              │
│  T H E   S C R O L L         │  display-1, Alegreya SC
│  O F   R E C A L L           │  parchment, ranged left
│                              │
│  [ cover slot — collapsed ]  │
│                              │
│  TODO: Sean's paragraph on   │
│  book two. No publication    │
│  claim of any kind.          │
│                              │
│◈─────◇─────◈─────◇─────◈─────│  THE SEAM
│┌────────────────────────────┐│
││ It is not out yet.         ││  the single ask, crossing
││ Be told when it is.        ││  TODO: Sean's wording
││ [ email           ] [  →  ]││  TODO: provider placeholder
│└────────────────────────────┘│
│                              │
│  ▓ Deep blue ground ▓        │
│                              │
│  ──────────────────────────  │  plain hairline, quiet
│  Finished The Burned Name?   │  small, subordinate,
│  Leave an honest review  →   │  per the brief
│                              │
│  seanbobbykerr.com           │
└──────────────────────────────┘
```

One ask above the fold. The review link sits at the foot, small, clearly secondary, exactly as the brief requires. No purchase links, no support link, no book three.

### Alternatives considered and rejected

**A. The full page frame.** Put the ornamental border around the whole viewport — corners in the viewport corners, edges tiling down the sides. The most literal use of the asset library.

Rejected on three grounds. The README's own tile tests say `edge-left` and `edge-right` are only "fair" at a boundary difference of 15.3 and `edge-top` is "poor" at 48.7, so a tiling frame will show visible restarts on any tall page. On a 360px phone a decorative border eats fifteen to twenty percent of usable width, on the device most readers arrive from. And it is the single most common move on fantasy author sites, which is the opposite of what the brief wants. It would also force the raster frame assets to scale up, which the resolution ceiling forbids.

**B. Vertical gold and blue split-screen hero.** Reproduce the back cover's left-right division literally as a two-column hero.

Rejected because it dies on mobile — a vertical split at 360px is just two stacked blocks, which is not the idea at all — and because split-screen heroes are a generic web pattern that reads as a template regardless of what colours are in it. The division survives as the horizontal seam instead, which keeps the meaning and works at every width.

**C. A parchment site.** Whole site on Parchment `#E1D0B1` with Ink text, matching the physical page.

Rejected because the brief asks for dark and ashen. Worth noting that this was the *technically easier* option: the frame art was drawn as bronze on white, so a light site would let those assets sit naturally with no treatment at all. Going dark is a deliberate cost. See the build risk in section 6.

**D. Ambient ash or particle motion in the hero.** Drifting embers on canvas.

Rejected. It is the clearest tell of AI-generated design right now, it costs battery and frame rate on the phones most readers use, and it would be the loudest thing on the page — spending boldness somewhere other than the signature.

### Motion

Almost none, on purpose. The seam draws once on load, from the centre outward, over about 600ms. Links carry a bronze underline that thickens on hover. Focus rings are Blue highlight at 2px with a parchment outer edge so they read on both grounds. That is the entire motion budget. `prefers-reduced-motion` disables the seam draw.

---

## 4. Signature

**The Divide seam.**

A single full-bleed horizontal boundary on every page where the ground changes hard from Ink to Deep blue, with the diamond-chain motif sitting exactly on the join, and precisely one element crossing it — always the page's single ask.

It comes from the trilogy's own world in two ways at once. The back cover is split warm against cool, and the books have a Burning Divide that ash-demons cross. The seam is that division turned into layout: warm above, cool below, one thing crossing. It is the only full-bleed element on the site, which is what gives it force.

It earns its place structurally rather than decoratively. Because only one element may cross the seam, the brief's "one page, one job" rule stops being a discipline someone has to remember and becomes a property of the layout. There is nowhere for a second competing call to action to go.

### Why the crown mark works as a masthead

The README flags a defect: `mark-crown` includes a run of the frame's top rail on both sides, so it is not an isolated emblem. Used as a masthead that flaw is the whole point. The rail runs out to both page edges as a hairline rule and the eagle sits centred on it. The asset is used exactly as drawn, uncropped, and the thing that made it awkward as a logo makes it correct as a header. No new asset needed.

### The aesthetic risk: the empty cartouche

Book three is not named on the site. The brief forbids showing "The Godscar Arch" publicly. Rather than write around that with "Book Three — coming soon", **the site shows `mark-foot`, the bronze nameplate with the blank centre, holding nothing.**

In a trilogy whose first book is called *The Burned Name*, about a religion whose name was suppressed, an empty nameplate is not a gap in the page. It is the most on-theme element on it. The constraint becomes the design.

This is a genuine risk. An empty ornamental frame on a commercial page can read as a broken image or an unfinished site, and some visitors will read it that way no matter what. Two mitigations: it appears only twice on the whole site, on home and `/books`, so it never becomes a motif; and it carries a short line beneath it so the emptiness reads as chosen rather than missing. **TODO: Sean writes that line.** Something that says the title is withheld, not absent.

I think it is worth the risk because every alternative is apologetic, and because this site's whole architecture is built for a reader who has finished book one and wants to know what is next. Withholding a name, visibly and deliberately, is a better answer to that reader than a placeholder.

---

## 5. Where cover art drops in later

Three defined slots, all 2:3 portrait, all currently `display: none` rather than reserved empty space. Nothing on the site looks like it is waiting for an image.

| Location | Position | Max width | Notes |
|---|---|---|---|
| Book pages under `/books/<slug>` | Above title on mobile, left of the title block on desktop | 380px desktop, 260px mobile | The primary slot. Two-column grid already in place with the image column at `0fr`. |
| Home, books run | Left of each book's title | 160px | Shown in the desktop wireframe as `cv`. |
| `/book1` | Between title and body copy, ranged left | 300px | |

**The home hero has no cover slot and never will.** That is deliberate. It means cover art arriving does not trigger a redesign of the most important screen on the site. The hero is type, the crown mark and the seam, permanently.

When art arrives, each slot becomes a token change — the image column goes from `0fr` to a fixed width — not a rebuild. Covers are never cropped, filtered or overlaid, per the brief.

---

## 6. Self-critique

Run before showing this, as the skill requires.

**Three book cards was the generic answer, and I cut it.** My first pass had the trilogy as a row of three equal cards, which is what every author site does and what I would produce for any of them. Revised to a descending run where each book is rendered at the weight of certainty it actually has. That is specific to a trilogy in this exact state and it does real work for the ten-second comprehension goal.

**Wide-tracked small caps was the generic answer, and I cut it.** Opening the tracking on a small-caps title produces the ceremonial fantasy-logo look that is one step from Cinzel. Setting it nearly tight instead makes titles read as cut rather than composed. Same face, different decision.

**The numbered markers survive scrutiny.** The skill warns that 01 / 02 / 03 markers are usually decoration. Here the books genuinely are a sequence and a reader deciding where to start needs the order, so "BOOK ONE / TWO / THREE" encodes real information. Kept.

**One thing I removed on the second pass.** I had the diamond chain appearing twice per page — once as the seam and again above the footer. That halves its force. The footer now gets a plain bronze hairline and the chain appears once per page, on the seam, only.

**What I am least sure about.** The seam requires the ground to change colour mid-page. On short pages, such as `/newsletter`, there may not be enough content below the seam for the Deep blue region to read as a deliberate zone rather than a stray band at the bottom. I will need to set a minimum height on the below-seam region and may need to rethink for the shortest pages. Flagging it now rather than discovering it at build time.

**Build risk: the frame art on a dark ground.** The corner and crown traces contain pale, near-white linework that was drawn to sit on white paper. The SVGs use layered `currentColor` with opacity, so on a dark ground those pale layers may render as low-opacity dark and the drawing could lose its form. My plan is to use the **transparent PNGs** for the crown mark and corners, since they retain the actual bronze and pale paint and will read on black, and the **SVG only for the diamond chain**, which is a simple solid shape that recolours cleanly. I want to test this on the first page rather than assume it. If the crown mark does not hold up at masthead size on black, I will come back to you before working around it.

---

## Open questions

1. **Newsletter provider.** Not decided, so no embed is designed. Every signup block above is a marked placeholder. The provider's own embed markup will constrain the field styling, so the sooner this is settled the less rework.
2. **The line under the empty cartouche.** Needs Sean's words. It is the sentence that makes the blank nameplate read as intentional.
3. **Positioning line, book hooks, book two paragraph.** All marked TODO. Sean writes these.
4. **Alegreya Sans as a third cut** — confirm you are happy treating the Alegreya superfamily as one family for the purposes of the two-family rule. If you would rather hold to two cuts strictly, utility text moves to Alegreya SC at small sizes and I will restyle the nav accordingly.
```
