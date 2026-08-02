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
| `freeChapterEndpoint` | Where the free-chapter email form submits to. This needs a real mailing-list or form endpoint (e.g. Mailchimp, ConvertKit, Buttondown, or your own API). Once set, `script.js` posts `{ name, email }` to it as JSON — see the `submitFreeChapter` function if the receiving service expects a different format. |
| `reviewUrl` | The "Review" link in the header navigation |
| `supportUrl` | The "Support" link in the header navigation |
| `instagramUrl` | Instagram icon, header and footer |
| `tiktokUrl` | TikTok icon, header and footer |
| `goodreadsUrl` | Goodreads icon, header and footer |

## A note on the free chapter form

Until `freeChapterEndpoint` has a real value, the form validates the email
address but always shows an honest message — "Email delivery will be
connected before launch" — instead of pretending to send anything. There is
no fake success state anywhere on the page.
