import InstaceCache from 'Core/InstanceCache';

import { poll } from 'Actions/Notifications';

import {
  getAccountIds,
  getAccountToken
} from 'Helpers/Models/Accounts';
import { dispatch } from 'Helpers/State/Store';
import { getCronPeriodByName } from 'Helpers/Lang/Date';

export function configurePollingScheduler(pollPeriod: string)
{
  let scheduler = InstaceCache.getInstance<IScheduler>('IScheduler');

  scheduler.clearAllJobs();

  let name = scheduler.scheduleJob(getCronPeriodByName(pollPeriod), {
    accountIds : getAccountIds()
  }, () =>
  {
    let params = scheduler.getJobParameters(name);

    pollingMethod(params.accountIds);
  });
};

export function pollingMethod(accountIds: string[])
{
  accountIds.forEach(id => dispatch(poll(getAccountToken(id))));
};