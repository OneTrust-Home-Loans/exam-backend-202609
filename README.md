# Practical exam - Backend (Node + TypeScript)

**Two bugs, about 25 minutes. Nothing to install.**

You've been handed two functions out of the service that feeds our loan
pipeline dashboard. Both shipped, both are wrong, and both have a bug report
attached. Your job is to make the checks pass.

## Running it

```
npm test          # both exercises
npm run test:1    # rate lock expiration
npm run test:2    # pipeline summary
```

Right now that's **0 of 10**. Node 23.6+ runs the TypeScript directly, so
there is no build step and no `npm install`. Node 24 is what we tested on;
`npm test` will tell you plainly if yours is too old.

## The two exercises

| | File | What broke |
|---|---|---|
| 1 | [src/rate-lock.ts](src/rate-lock.ts) | Locks are being called expired a day early |
| 2 | [src/pipeline.ts](src/pipeline.ts) | Every milestone column shows the same numbers, and one manager gets a 500 |

The brief for each is in a comment at the top of the file. Read it before
you start - in both cases the spec is more specific than the code is.

## Ground rules

- Edit only the files under `src/`. Don't change anything in `test/`.
- No new dependencies. Everything here is solvable with what's in the
  language.
- Don't reach for a date library in exercise 1. We want to see you reason
  about the problem, and in the real service this runs in a Lambda where
  we care about the bundle.
- Working code beats clever code. If you finish early, tidy up.

## How you're assessed

We may do one of these by reading together rather than typing - we'll say
which at the start.

Passing checks is the floor, not the bar. We're going to ask you to walk
through what was actually wrong and why it behaved the way the bug report
described - including the parts of the report the tests don't cover, like
why exercise 1 couldn't be reproduced in the morning. Comment as you go if
that helps you remember.

If you get stuck, say so out loud and tell us what you've ruled out. That's
worth more than silence.
