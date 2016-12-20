import InstaceCache from 'Core/InstanceCache';

import { pollSinceNotifications } from 'Actions/Notifications';

import {
  isPolling,
  getLastPoll
} from 'Helpers/Models/App';
import {
  getAccountIds,
  getAccountToken
} from 'Helpers/Models/Accounts';
import { dispatch } from 'Helpers/State/Store';
import { getCronPeriodByName } from 'Helpers/Lang/Date';

/**
 * @param  {string} pollPeriod
 */
export function configurePollingScheduler(pollPeriod: string)
{
  let scheduler = InstaceCache.getInstance<IScheduler>('IScheduler');

  /*
   * Clear all the current jobs. We'll reconfigure them below.
   */
  scheduler.clearAllJobs();

  /*
   * Setup the job for polling
   */
  let name = scheduler.scheduleJob(getCronPeriodByName(pollPeriod), {
    accountIds : getAccountIds()
  }, () =>
  {
    if (isPolling()) {
      return;
    }

    /*
     * Get the parameters we passed for this job
     */
    let params = scheduler.getJobParameters(name);
    if (typeof params.accountIds === 'undefined') {
      return;
    }

    pollingMethod(params.accountIds);
  });
};

/**
 * @param  {string[]} accountIds
 */
export function pollingMethod(accountIds: string[])
{
  let lastPoll = getLastPoll();

  /*
   * For each of the accounts, poll for
   * notifications since we last polled.
   */
  accountIds.forEach(id => dispatch(pollSinceNotifications(
    id, getAccountToken(id), lastPoll, true
  )));
};