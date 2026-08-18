# Agent Instructions

This repository builds the author website for **Sean Bobby Kerr**, who writes the Maelum Trilogy: adult epic fantasy set in a world called Gyra.

- *The Burned Name* (Book 1) is published.
- *The Scroll of Recall* (Book 2) is in revision.
- *The Godscar Arch* (Book 3) is being drafted.

## What the site is for

Three jobs, in priority order:

1. Collect email addresses.
2. Give a first-time visitor, who has never heard of me, a reason to want the books.
3. Send people to where the books are sold.

Anything that does not serve one of those three is optional.

## Design

You have complete freedom. There is no house style, no fixed palette, no required layout, no set of rules to follow. Make real choices and show me the result. If I do not like something I will say so plainly and you can throw it out and try a different direction.

Do not ask me what I want it to look like. I would rather react to something than specify it up front.

## How to operate

**Build, then show.** Run it locally and tell me the URL. I want to look at the thing, not read a plan for the thing.

**Ask before large structural changes.** Small edits, just make them. Deleting or restructuring whole sections, check first.

**Commit in small pieces.** One coherent change per commit, with a message that says what changed. If I hate a direction, I want to be able to walk it back cleanly.

**Do not write copy about the books.** Placeholder text is fine, and label it clearly as placeholder. Blurbs, taglines, and anything describing the story are mine to write.

**Say when you are guessing.** If you are unsure whether something works, or you have not tested it, say so rather than presenting it as finished.

## Git & deployment

This repo is connected to `https://github.com/seanbobbykerr/seanbobbykerr.git`, with `main` as the production branch. Pushes to `main` trigger an automatic Vercel deploy of the live site.

**Whenever you complete a website change I requested, automatically commit it and push it to `main`.** Do not ask whether you should commit or push — just do it once the change is done. I want the live site to update without me managing Git by hand. This does not relax "ask before large structural changes" above — check first for big restructures, but once a change (large or small) is actually finished, push it without asking.

Rules for this:

- The current local website is the source of truth. Never overwrite it with an older or emptier version from GitHub.
- Do not wait for me to review changes locally before pushing.
- Write a sensible, descriptive commit message based on the change just made.
- Only commit files that belong to this website project.
- Keep `.gitignore` current so temp files, caches, local tooling, and anything not meant to be public never get committed.
- Never commit passwords, private credentials, secret API keys, or other sensitive information.
- The public Web3Forms client access key already used by the site (in `site-config.js`) is intentionally allowed in frontend code — it is not a secret.
- If a Git operation fails, fix it if reasonably possible. If you genuinely need something from me (e.g. GitHub authentication), say so plainly rather than working around it.
- Do not alter the site's design or functionality merely as a side effect of Git/deploy work.

## Stack

Plain HTML and CSS. No build step, no framework, unless there is a specific reason and you tell me the reason first. Serving the folder or opening the file should be enough to see it.

## Files

Whatever structure makes sense. Keep it obvious enough that I can find things without asking.

`brand_assets/` holds artwork from my cover illustrator. Read from it, never overwrite it.

## Bottom line

Make something. Show me. I will tell you what is wrong with it, and we go again.
