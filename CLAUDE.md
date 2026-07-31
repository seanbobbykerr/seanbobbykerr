# Project brief: Sean Bobby Kerr author website

## What this project is

A static author website for Sean Bobby Kerr, a fantasy author based in Sydney, Australia. The site exists to do three things, in order of importance:

1. Capture newsletter signups. The mailing list is the only reader asset Sean owns outright.
2. Present the Maelum Trilogy so a browsing reader can work out, in under ten seconds, what the books are and whether they want them.
3. Give agents, reviewers and book bloggers a clean, credible place to find materials.

Everything else is secondary. If a feature does not serve one of those three, question whether it belongs.

## Required skill: frontend-design

**The `frontend-design` skill is mandatory for this project.** It is installed at `.claude/skills/frontend-design/SKILL.md` in this repository.

Load it at the start of any session involving visual work, and state explicitly that you have loaded it before proposing a plan. Visual work means anything touching layout, typography, colour, spacing, motion, or CSS of any kind — including small adjustments to pages that already exist.

Do not write a line of CSS or build a page without it. Design decisions come from that skill's process — brainstorm, token system, plan, self-critique, build — not from whatever defaults you would otherwise reach for.

Where the skill's guidance and the design direction below disagree, the direction below wins. The skill itself says an explicit brief overrides its defaults.

## Who the author is

- Fantasy author. Writing is the primary career, not a hobby project.
- Former criminal defence lawyer. That background informs a precise, engineered approach to prose. It can be mentioned in the About page but should never dominate it — this is an author site, not a legal CV.
- Based in Sydney. Australian, and the site should read that way.

## The books

**The Maelum Trilogy** — epic fantasy set in the world of Gyra.

- Book One: *The Burned Name* (~127,800 words)
- Book Two: *The Scroll of Recall*
- Book Three: *The Godscar Arch* (working title — do not present this as final anywhere public-facing)

World and premise elements available for copy: the suppressed Maelum religion, ash-demons across the Burning Divide, the Expatria order. The protagonist is Everett Dwyer — prematurely aged, wields darkness magic — travelling with companions Rhi and Quillion.

**Other work:**
- *A Journey Thrice Begun* — a standalone novel, 190,000 words.
- A 219-tip writing guide, available as an EPUB.

**IMPORTANT — publication status.** Do not state or imply that any book is published, available for purchase, forthcoming, or under contract. Do not invent retailer links, release dates, ISBNs, review quotes, awards, or blurbs. Where the site needs that information, insert a clearly marked `TODO:` placeholder and ask.

## Voice and copy rules

- Australian English spelling and idiom throughout, in both site copy and any code comments or documentation.
- Spaces around em dashes: `word — word`, not `word—word`.
- No Oxford commas.
- Double quotation marks for dialogue. Single quotes for remembered or reported speech.
- Tone for the site: spare, atmospheric, confident. Short sentences. Concrete nouns.
- **Do not** use the register of Sean's corporate storytelling site. No business-services language, no "solutions", no "let's work together", no consultancy framing. This is a reader-facing author site and the voice should be closer to the books than to a pitch deck.
- Avoid the standard author-website clichés: "weaving tales", "transported to another world", "a lifelong love of storytelling", "when he isn't writing, you'll find him...".
- **Never write final marketing copy, blurbs, bio text or book descriptions and present them as done.** Sean writes those. Where copy is needed, either use his supplied text or leave a marked placeholder and flag it.

## Brand assets

The brand library lives in `brand_assets/`, built from the cover artist's original files. Read `brand_assets/README.md` first — it is the full inventory, with every asset's source, crop coordinates, dimensions and intended use. Read it before making any visual decision. The palette and motifs here are established across the trilogy and the site extends them rather than inventing alongside them.

Structure:

```
brand_assets/source/       the artist's original TIFFs — never touch
brand_assets/01_faithful/  pixel-exact crops, verified against the source
brand_assets/02_derived/   transparency, SVG traces, palette, WebP, favicons
```

Rules:
- **`source/` and `01_faithful/` are read-only masters.** Never edit, overwrite, crop or recolour anything in either. Use `02_derived/` for anything the site actually serves.
- **Prefer the SVGs.** `02_derived/svg/` holds vector traces of the crown mark, the top-left corner and the diamond-chain divider. They use `currentColor`, so recolour them in CSS rather than exporting new raster versions.
- **Transparent PNGs** in `02_derived/transparent/` are the frame elements with backgrounds knocked out. Use these for anything overlaying a coloured surface.
- **Favicons already exist** at `02_derived/web/favicon/`. Do not generate new ones. The 16 and 32 px versions are too detailed to read well — use them, but do not treat small-size legibility as solved.
- Cover art is never cropped, filtered, or overlaid with text.
- If you need an asset that does not exist, ask before generating one.
- Keep the TIFFs and the large masters out of git. Add a `.gitignore` rule early and commit only what the site serves.

**Palette — use these values, do not invent others.** All eight are sampled directly from the back cover artwork:

| Role | Hex |
|---|---|
| Gold highlight | `#F4B039` |
| Gold field | `#BF8C32` |
| Bronze shadow | `#A17529` |
| Blue highlight | `#2D4FA0` |
| Blue field | `#2F4989` |
| Deep blue | `#1E2C4B` |
| Parchment | `#E1D0B1` |
| Ink | `#000000` |

**Resolution ceiling.** The source artwork is print-trim size, so the `@2x` web exports are the maximum available — there is no headroom above them. Do not design full-bleed hero backgrounds or large-scale imagery around these raster assets; they will look soft. Large-scale work uses the SVGs, or type and colour instead. Tell me if a design needs artwork bigger than what exists.

**Two known quirks.** The crown mark (`mark-crown`) includes a run of the frame's top rail on both sides, so it is not an isolated emblem — flag it if you need the eagle alone. And `edge-bottom` scores well on tiling only because most of the crop is blank; the left and right edges are the reliable tiling strips.

## Design direction

Load `frontend-design` before acting on anything in this section, and read `brand_assets/README.md` before choosing a palette or typeface.

- Dark, ashen palette in keeping with the trilogy. Restraint over decoration.
- The series has an established brand mark: a border design with compass-cross corners and a diamond chain along the sides. Reuse this motif sparingly as a site-wide visual signature — dividers, page frames, section breaks. Do not overuse it.
- Typography carries the identity. One display face for headings, one highly legible face for body text. No more than two families.
- **Consider carrying the book's typeface onto the site.** The printed trilogy is set in Alegreya, with Alegreya SC for small caps. Both are free on Google Fonts. A reader who scans the code in the back of the paperback and lands on a site set in the same face experiences one continuous object rather than two unrelated things. That continuity is worth more than a novel typeface. Depart from it only with a reason you can state.
- **There is no front cover artwork yet.** Do not design around one, do not use a placeholder rectangle where a cover would go, and do not treat its absence as a gap to be filled with stock imagery. The hero and the book pages are carried by typography, the frame motifs and the palette. When cover art does arrive, it should be able to slot into a defined place without the layout being rebuilt — design that place deliberately, and tell me where it is.
- Never crop, filter, or overlay text on cover art if it is added later.
- Mobile first. Most readers will arrive from an Instagram link on a phone.

## Site structure

Build in this order. Get each page working and committed before starting the next.

1. **Home** — hero with the trilogy, newsletter signup above the fold, short positioning line.
2. **The Maelum Trilogy** — series overview page linking to the individual books.
3. **Book pages** — one per title. Cover, description, series position, links out.
4. **About** — bio, photo, the short version of the legal-background story.
5. **Media kit** — for reviewers and bloggers. Downloadable cover art at print and web resolution, short and long bio, headshot, contact.
6. **Contact** — a simple form or email link. Keep it low maintenance.

**Build `/book1`, `/review`, `/newsletter` and `/support` first, before any of the above.** See the URL structure section — they are the pages with a hard external deadline.

Newsletter signup appears on every page, not only the home page. Goodreads links belong on book pages — Sean routinely directs readers there for reviews.

## URL structure — read this before creating any page

This section describes permanent constraints, not preferences. Getting these wrong later cannot be fixed by editing a file.

**No `.html` in any public address.** Every page is served from a folder with an `index.html` inside it, so the address is `/about/`, never `/about.html`. Build it this way from the first page. Do not create top-level `.html` files and plan to fix the URLs afterwards.

```
book1/index.html                    →  serves at /book1
about/index.html                    →  serves at /about
books/index.html                    →  serves at /books
books/the-burned-name/index.html    →  serves at /books/the-burned-name
index.html                          →  serves at /
```

**Four addresses are printed in physical books and can never change.** The back matter of *The Burned Name* carries four separate pages, each with its own QR code and its own destination:

| Print page | Address | Landing page leads with |
|---|---|---|
| To be continued | `/book1` | *The Scroll of Recall* |
| Leave a review | `/review` | Review links for every book |
| Join the mailing list | `/newsletter` | Signup form, nothing else competing |
| Support the work | `/support` | However Sean is currently taking support |

Each address is named for what it does, not for where it currently points, so the content behind it can change forever while the printed address stays valid. Once those books exist, all four are permanent. Therefore:

- None of them may be renamed, moved, nested, or deleted. Not in a restructure, not in a tidy-up, not ever.
- Each must work with and without a trailing slash.
- Each must exist from the very first deployment, even as a holding page reading "Coming soon". A live placeholder beats a 404.
- Build each as a real landing page, not a redirect. Readers arriving from print should land somewhere written for them.
- If any future change would affect any of these addresses, stop and tell me before doing it.

**One page, one job.** Each landing page leads with a single ask. The printed pages are already separated, so a reader arriving at any of these chose that ask deliberately. Do not re-merge them by stacking every call to action on every page. Secondary links are allowed at the foot of a page, small and clearly subordinate.

**`/book1`** — *The Scroll of Recall* is the primary ask: a coming-soon notice with a mailing-list signup until it is purchasable, then purchase links. Beneath it, a small secondary line offering the review. Later books follow the same pattern, with `/book2` printed inside *The Scroll of Recall*. Do not create those pages until asked.

**`/review`** — every published book listed, each with its own review links. A reader who has read more than one should be able to review more than one without hunting. Put Goodreads before Amazon: Amazon gates reviewing behind an account spend threshold, so a real share of readers cannot leave one there even when willing. Goodreads has no such barrier. Do not solicit positive reviews — the wording asks for an honest one.

**`/newsletter`** — the signup form and nothing competing with it. No purchase links, no Patreon.

**`/support`** — what a supporter actually gets, then the link out. The address is deliberately platform-neutral rather than named after any one service, because it is printed permanently. If Sean ever leaves the platform he is currently on, this page explains that and points readers somewhere else — it is never allowed to 404 or to redirect to a dead account. Do not create this page until I confirm the tiers.

The content behind these addresses is expected to change over the years. The addresses are not.

**Do not add print-entry asks to the general book pages under `/books/`.** A visitor arriving from search or navigation has probably not read the book, so a review ask is meaningless there and dilutes the purchase.

**Book pages are separate from printed addresses.** The books section lives at `/books`, with individual pages at `/books/<book-title-slug>` — for example `/books/the-burned-name`. Those are for web navigation and search. Never print them, and keep them free to change. Main navigation gets a single "Books" link, not one link per title. Do not create a page for Book Three; the title is provisional.

**The canonical hostname is `seanbobbykerr.com`, without `www`.** This is decided, not a preference to revisit. `www.seanbobbykerr.com` must 301-redirect to the non-www form on every path. Every printed QR code encodes the non-www address directly, so any change here would invalidate physical books. Do not switch the canonical form, and do not emit `www` in canonical tags, sitemaps, structured data, internal links or Open Graph URLs.

**Other URL rules:**
- Lowercase throughout. Hyphens between words, never underscores or spaces.
- HTTPS enforced. HTTP redirects to HTTPS.
- Set a `<link rel="canonical">` on every page.
- Never change a published URL without a 301 redirect from the old one.

## Technical constraints

- Static site. Plain HTML and CSS, or Astro if a component structure genuinely helps. No React unless there is a concrete reason and you have explained it first.
- No CMS, no database, no backend Sean has to maintain.
- Newsletter signup should be an embed from an email provider, not a custom form with a server behind it. Confirm which provider before building.
- Fast and accessible. Semantic HTML, real alt text, keyboard navigable, decent contrast.
- SEO basics: sensible page titles, meta descriptions, Open Graph tags for link previews, and `Person` and `Book` structured data.
- Target deployment: a static host such as Cloudflare Pages or Netlify, with a custom domain.

## How to work with me

I am new to command-line tools. Assume no prior knowledge and explain what a command does before I run it.

- **Propose a plan before writing code.** Especially for anything touching more than one file. I want to correct direction while it is still a paragraph.
- **One page or one task at a time.** Do not scaffold the entire site in a single pass.
- **Commit after each working change**, with a plain-English message. I need to be able to roll back.
- **Ask rather than assume.** If a fact about the books, the publishing situation, or my preferences is missing, ask. Do not fill the gap with a plausible guess.
- **Tell me when I am wrong.** If I ask for something that will cause problems, say so directly rather than building it.
- **Confirm the skill is loaded.** At the start of any session that will touch design, say which skills you have loaded. If `frontend-design` is not among them, stop and tell me before continuing.
- **Verify every printed address after every deployment.** Check `/book1`, `/review`, `/newsletter` and `/support` resolve without `.html`, with and without a trailing slash, on both http and https. Report the result for each.
- Never commit secrets, API keys or `.env` files. Set up a `.gitignore` early.
