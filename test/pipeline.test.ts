/* Checks for exercise 2. Don't edit this file. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summarizeByMilestone, type Loan, type Milestone } from '../src/pipeline.ts';
import { BRANCH_PIPELINE, DASHBOARD_MILESTONES } from '../src/fixtures.ts';

function freshPipeline(): Loan[] {
  return BRANCH_PIPELINE.map((loan) => ({ ...loan }));
}

test('each milestone counts only its own loans', () => {
  const summary = summarizeByMilestone(freshPipeline(), DASHBOARD_MILESTONES);

  assert.equal(summary['Underwriting'].count, 2);
  assert.equal(summary['Processing'].count, 2);
  assert.equal(summary['Approval'].count, 1);
  assert.equal(summary['Funding'].count, 1);
});

test('each milestone totals only its own loans', () => {
  const summary = summarizeByMilestone(freshPipeline(), DASHBOARD_MILESTONES);

  assert.equal(summary['Underwriting'].totalCents, 41_250_000 + 55_000_000);
  assert.equal(summary['Processing'].totalCents, 28_900_000 + 19_800_000);
  assert.equal(summary['Approval'].totalCents, 62_150_000);
});

test('a milestone with nothing in it still renders as an empty column', () => {
  const summary = summarizeByMilestone(freshPipeline(), DASHBOARD_MILESTONES);

  assert.ok('Started' in summary, 'Started is missing from the summary');
  assert.deepEqual(summary['Started'], { count: 0, totalCents: 0, loanNumbers: [] });
});

test('loan numbers land under the right milestone, in the order given', () => {
  const summary = summarizeByMilestone(freshPipeline(), DASHBOARD_MILESTONES);

  assert.deepEqual(summary['Underwriting'].loanNumbers, ['2609001842', '2609002104']);
  assert.deepEqual(summary['Processing'].loanNumbers, ['2609000317', '2609001560']);
});

test('a milestone we do not display is skipped, not crashed on', () => {
  const loans = freshPipeline();
  loans.push({
    loanNumber: '2609003001',
    borrower: 'Ferreira, P.',
    milestone: 'Post Closing' as Milestone,
    loanAmountCents: 47_000_000,
    loanOfficer: 'J. Santos',
  });

  const summary = summarizeByMilestone(loans, DASHBOARD_MILESTONES);

  assert.deepEqual(Object.keys(summary).sort(), [...DASHBOARD_MILESTONES].sort());
  const counted = Object.values(summary).reduce((n, b) => n + b.count, 0);
  assert.equal(counted, 6, 'the undisplayed loan leaked into a bucket');
});
