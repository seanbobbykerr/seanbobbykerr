# Adding real links

Every button and social icon on the landing page reads its destination from
one file: **`site-config.js`**. That is the only file you need to touch when
a link becomes real — nothing else on the page has to change.

Right now every value is an empty string `""`, which is why the buttons show
a small "coming soon" note instead of going anywhere.

## How to add a link

1. Open `site-config.js`.
2. Paste the URL between the quotes for the field you want to fill in.
3. Save the file and refresh the page — that button or icon now works, the
   pending note disappears automatically, and nothing else needs editing.

If you're not comfortable editing the file yourself, just tell Claude Code
something like:

> "Set bookOnePurchaseUrl to https://www.amazon.com/my-book-link"

and it will make the change for you.

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

Both forms deliver straight to your inbox via [Web3Forms](https://web3forms.com) —
a free service built for exactly this: static sites with no backend that
need form submissions emailed somewhere, without a server and without any
secret credentials sitting in the page.

To turn them on:

1. Go to https://web3forms.com and enter **seanbobbykerr@gmail.com**.
2. You'll immediately get an **Access Key** by email — no account or
   password required.
3. Paste that key into `web3formsAccessKey` in `site-config.js`.

That's it — both forms start working the moment the key is filled in. Every
submission arrives as an email to seanbobbykerr@gmail.com with:

- **Subject:** `<name> wants to join the mailing list!` (or the visitor's
  email address if they left the optional name field blank on the homepage
  form)
- **Body:** the submitted name (if any), email, and which form it came from
  ("Homepage Free Chapter Form" or "Subscribe Page")

This key is meant to be public/embedded in front-end code — Web3Forms
documents it as safe to expose (similar to a reCAPTCHA site key). It can
only be used to send a submission to the inbox that was registered when the
key was created; it can't be used to read, redirect, or change anything.

Until `web3formsAccessKey` has a real value, each form validates the email
address but always shows an honest message — "Email delivery will be
connected before launch" / "Mailing-list delivery will be connected before
launch" — instead of pretending to send anything. There is no fake success
state anywhere on the site.
