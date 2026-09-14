/* Plain JS on purpose - this has to run on any Node, including one too old
 * to parse the TypeScript in src/. Gives a clear message instead of a
 * SyntaxError the candidate can't act on. */
'use strict';

const REQUIRED_MAJOR = 23;
const REQUIRED_MINOR = 6;

const [major, minor] = process.versions.node.split('.').map(Number);
const ok = major > REQUIRED_MAJOR || (major === REQUIRED_MAJOR && minor >= REQUIRED_MINOR);

if (!ok) {
  const flagged = major > 22 || (major === 22 && minor >= 6);
  console.error(`
  This lab runs TypeScript directly, with no build step. That needs
  Node 23.6 or newer. You're on ${process.versions.node}.

  Install Node 24 (LTS) from https://nodejs.org and run this again.
${flagged ? `
  Or, to use the Node you already have:
    node --experimental-strip-types --test test/rate-lock.test.ts
` : ''}`);
  process.exit(1);
}
