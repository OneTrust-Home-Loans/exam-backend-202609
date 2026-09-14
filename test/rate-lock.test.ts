/*
 * Checks for exercise 1. Don't edit this file.
 *
 * The branch is on Pacific time, so that's what we pin the clock to.
 */
process.env.TZ = 'America/Los_Angeles';

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lockStatus, type RateLock } from '../src/rate-lock.ts';

function lock(expiresOn: string, lockedOn = '2026-02-14', lockPeriodDays = 30): RateLock {
  return { loanNumber: '2602004417', lockedOn, expiresOn, lockPeriodDays };
}

/** A local wall-clock time on the branch's calendar. */
function localTime(y: number, m: number, d: number, h: number, min = 0): Date {
  return new Date(y, m - 1, d, h, min);
}

test('a lock with room left is active', () => {
  assert.deepEqual(lockStatus(lock('2026-03-20'), localTime(2026, 3, 15, 9)), {
    state: 'active',
    daysRemaining: 5,
  });
});

test('a lock expiring today is still good at 11:30pm', () => {
  assert.deepEqual(lockStatus(lock('2026-03-15'), localTime(2026, 3, 15, 23, 30)), {
    state: 'expiring',
    daysRemaining: 0,
  });
});

test('a lock that ran out yesterday is expired, and says how far past', () => {
  assert.deepEqual(lockStatus(lock('2026-03-14'), localTime(2026, 3, 15, 8)), {
    state: 'expired',
    daysRemaining: -1,
  });
});

test('the expiring warning starts at 3 days, not 4', () => {
  assert.equal(lockStatus(lock('2026-06-04'), localTime(2026, 6, 1, 10)).state, 'expiring');
  assert.equal(lockStatus(lock('2026-06-05'), localTime(2026, 6, 1, 10)).state, 'active');
});

test('works in a month the lock period crosses', () => {
  assert.deepEqual(lockStatus(lock('2026-01-02', '2025-12-03'), localTime(2025, 12, 31, 16)), {
    state: 'expiring',
    daysRemaining: 2,
  });
});
