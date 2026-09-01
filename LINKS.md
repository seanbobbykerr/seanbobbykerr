# Adding real links

Every button and social icon on the site reads its destination from
`site-config.js`, and every one of those values is already filled in and
live.

**Important:** for search engines and no-JavaScript visitors to actually see
these links, each one is also hardcoded as a real `href` directly in every
page's HTML — not just read from this file at runtime. So `site-config.js`
is no longer the *only* file that needs touching when a URL changes; it's
the reference copy, and every matching `href="..."` in the `.html` files
needs to be updated to stay in sync with it.

## How to change a link

1. Open `site-config.js` and update the value for the field you want to change.
2. Search every `.html` file for the *old* URL and replace it with the new
   one wherever it appears as an `href`.
3. Save and refresh — just tell Claude Code something like:

> "Set bookOnePurchaseUrl to https://www.amazon.com/my-book-link and update
> it everywhere it's used"

and it will update both the config file and every hardcoded href for you.

## What each field controls

| Field | Where it's used |
|---|---|
| `bookOnePurchaseUrl` | Every "Buy The Burned Name" button (hero, Burned Name section, final section) |
| `bookTwoPreorderUrl` | Every "Preorder Book Two / The Scroll of Recall" button |
| `web3formsAccessKey` | Powers both email forms: the homepage "free chapter" form and the `/subscribe` newsletter form. See below. |
| `bookOneGoodreadsReviewUrl` | The "Review on Goodreads" button on `/review` for The Burned Name |
| `bookOneAmazonReviewUrl` | The "Review on Amazon" button on `/review` for The Burned Name |
| `supportUrl` | Both Patreon buttons on `/support` ("Read Vaal's Origin on Patreon" and "Visit My Patreon") |
| `supportPlatformName` | Every mention of "Patreon" on `/support` — change this (and the two fields below) if you ever move to a different membership platform |
| `supportPlatformLogo` | The logo shown on both `/support` CTA buttons |
| `instagramUrl` | Instagram icon, header and footer |
| `tiktokUrl` | TikTok icon, header and footer |
| `goodreadsUrl` | Goodreads icon, header and footer |

## If you move off Patreon

`/support` is the permanent URL printed in the books, so it's built to outlive
whichever platform is behind it. To swap platforms, update these three
fields in `site-config.js`:

- `supportUrl` — the new platform's URL
- `supportPlatformName` — its name (e.g. `"Ko-fi"`)
- `supportPlatformLogo` — path to its logo file, in `brand_assets/`. Keep it
  written as `../brand_assets/your-logo.png` (relative to `/support/index.html`,
  not a leading-slash `/brand_assets/...` path) — the site has to keep working
  when a page is opened directly as a file, and a leading slash breaks that.

The surrounding sentences ("Read Vaal's Origin on ___", "What Is ___?") are
still hand-written English, not generated from these values, so if the new
name reads awkwardly in that phrasing you may want to touch up the copy in
`support/index.html` too — but the link, name and logo everywhere on the page
update automatically from the three fields above.

## The free chapter and newsletter forms

Both forms (the homepage "free chapter" form and the `/subscribe` page form)
post to `/api/subscribe`, a small Vercel serverless function
(`api/subscribe.js`) — the one and only place that talks to Kit. The browser
never sees a Kit credential.

What happens on submit:

1. The function validates and normalises the email server-side.
2. It upserts the subscriber into your Kit mailing list via the Kit API v4
   (`POST https://api.kit.com/v4/subscribers`), authenticated with
   `KIT_API_KEY` — read from `process.env.KIT_API_KEY`, never from the page.
   Submitting an email that's already subscribed just updates that
   subscriber; it does not create a duplicate.
3. It also forwards the same submission to
   [Web3Forms](https://web3forms.com) as a backup inbox notification, using
   `web3formsAccessKey` from `site-config.js` — unchanged from before, and
   still fine to keep public/embedded in front-end code (Web3Forms documents
   it as safe to expose, similar to a reCAPTCHA site key). This step is
   best-effort: it never blocks or fails the visitor-facing result, so a
   Web3Forms hiccup can't break a signup, and a Kit hiccup doesn't cost you
   the lead either, since you'd still get the backup email.
4. The visitor only sees a success message once **Kit** has actually
   accepted the subscriber — that's the real source of truth now, not the
   inbox email.

To turn it on, set `KIT_API_KEY` (your Kit API v4 key) as an environment
variable — locally in `.env.local` (gitignored, see `.env.example`), and in
Vercel's project settings for production. Until `KIT_API_KEY` is configured,
both forms validate the email but always show an honest message — "Email
delivery will be connected before launch" / "Mailing-list delivery will be
connected before launch" — instead of pretending to send anything. There is
no fake success state anywhere on the site.

Optional: set `KIT_TAG_ID` (also in `.env.local` / Vercel) to a numeric Kit
Tag ID if you want every website subscriber automatically tagged (e.g. a
"Website Signup" tag), so they're identifiable as coming from
seanbobbykerr.com. Find/create the tag in Kit under Grow > Tags — the ID is
in its URL. Leave blank to skip tagging; subscriber creation works fine
without it.
