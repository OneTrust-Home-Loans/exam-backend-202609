/*
 * EXERCISE 1 - Rate lock expiration
 *
 * Run:  npm run test:1
 *
 * THE REPORT
 * ----------
 * The lock desk dashboard is calling locks expired a day early, and the
 * "days remaining" column disagrees with Encompass by a day or two on some
 * loans but not others. Nobody can reproduce it in the morning.
 *
 * WHAT IT HAS TO DO
 * -----------------
 * A rate lock is good THROUGH the end of its expiration date. Encompass
 * hands us calendar dates as 'YYYY-MM-DD' strings - no time, no zone. The
 * business day is the branch's local day, which is the timezone this
 * process runs in.
 *
 *   daysRemaining  whole calendar days from asOf's local date to expiresOn.
 *                  Expires today = 0. Tomorrow = 1. Yesterday = -1.
 *
 *   state          'expired'   daysRemaining < 0
 *                  'expiring'  0 through 3 inclusive  (lock desk warning)
 *                  'active'    4 or more
 *
 * Fix lockStatus. Do not change the test file, and do not add dependencies.
 */

export type RateLock = {
  loanNumber: string;
  /** 'YYYY-MM-DD' - the day the lock was taken. */
  lockedOn: string;
  /** 'YYYY-MM-DD' - the last day the lock is honored. */
  expiresOn: string;
  lockPeriodDays: number;
};

export type LockState = 'active' | 'expiring' | 'expired';

export type LockStatus = {
  state: LockState;
  daysRemaining: number;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function lockStatus(lock: RateLock, asOf: Date): LockStatus {
  // TODO: this is the code that shipped. Two of these three lines are wrong.
  const expires = new Date(lock.expiresOn);
  const daysRemaining = Math.floor((expires.getTime() - asOf.getTime()) / MS_PER_DAY);

  if (expires < asOf) {
    return { state: 'expired', daysRemaining };
  }

  return { state: daysRemaining <= 3 ? 'expiring' : 'active', daysRemaining };
}
