/*
 * EXERCISE 2 - Pipeline summary by milestone
 *
 * Run:  npm run test:2
 *
 * THE REPORT
 * ----------
 * The branch manager's pipeline dashboard shows the same loan count and the
 * same dollar total under every milestone, and the totals are roughly the
 * whole branch. One manager gets a 500 instead of a dashboard.
 *
 * WHAT IT HAS TO DO
 * -----------------
 *   1. Every milestone in `milestones` appears in the result, even when no
 *      loan is sitting in it (the dashboard renders an empty column).
 *   2. A loan whose milestone is not in `milestones` is left out entirely.
 *      Encompass has milestones we don't show, and it must not throw.
 *   3. loanNumbers keeps the order the loans came in.
 *
 * Fix summarizeByMilestone. Do not change the test file.
 */

export type Milestone =
  | 'Started'
  | 'Processing'
  | 'Underwriting'
  | 'Approval'
  | 'Docs Out'
  | 'Funding';

export type Loan = {
  loanNumber: string;
  borrower: string;
  milestone: Milestone;
  /** Cents. We never put money in a float. */
  loanAmountCents: number;
  loanOfficer: string;
};

export type MilestoneSummary = {
  count: number;
  totalCents: number;
  loanNumbers: string[];
};

export type PipelineSummary = Record<string, MilestoneSummary>;

const EMPTY: MilestoneSummary = { count: 0, totalCents: 0, loanNumbers: [] };

export function summarizeByMilestone(loans: Loan[], milestones: Milestone[]): PipelineSummary {
  // TODO: this is the code that shipped.
  const summary: PipelineSummary = {};

  for (const milestone of milestones) {
    summary[milestone] = EMPTY;
  }

  for (const loan of loans) {
    const bucket = summary[loan.milestone];
    bucket.count += 1;
    bucket.totalCents += loan.loanAmountCents;
    bucket.loanNumbers.push(loan.loanNumber);
  }

  return summary;
}
