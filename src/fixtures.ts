/** A slice of one branch's pipeline. Shared by the exercise 2 checks. */
import type { Loan, Milestone } from './pipeline.ts';

export const DASHBOARD_MILESTONES: Milestone[] = [
  'Started',
  'Processing',
  'Underwriting',
  'Approval',
  'Docs Out',
  'Funding',
];

export const BRANCH_PIPELINE: Loan[] = [
  { loanNumber: '2609001842', borrower: 'Alvarez, R.',  milestone: 'Underwriting', loanAmountCents: 41_250_000, loanOfficer: 'M. Whitfield' },
  { loanNumber: '2609000317', borrower: 'Brennan, T.',  milestone: 'Processing',   loanAmountCents: 28_900_000, loanOfficer: 'M. Whitfield' },
  { loanNumber: '2609002104', borrower: 'Okafor, D.',   milestone: 'Underwriting', loanAmountCents: 55_000_000, loanOfficer: 'J. Santos' },
  { loanNumber: '2609000998', borrower: 'Price, K.',    milestone: 'Funding',      loanAmountCents: 33_475_000, loanOfficer: 'J. Santos' },
  { loanNumber: '2609001560', borrower: 'Nakamura, S.', milestone: 'Processing',   loanAmountCents: 19_800_000, loanOfficer: 'L. Duarte' },
  { loanNumber: '2609002233', borrower: 'Whitcomb, A.', milestone: 'Approval',     loanAmountCents: 62_150_000, loanOfficer: 'L. Duarte' },
];
