import InstanceCache from 'Core/InstanceCache';

import { updatePollPeriod } from 'Actions/Settings';
import { configurePollingScheduler } from 'Helpers/System/Scheduler';

/**
 * @param  {string} pollPeriod
 */
export function configurePollPeriod(pollPeriod: string)
{
  let scheduler = InstanceCache.getInstance<IScheduler>('IScheduler');

  return dispatch =>
  {
    dispatch(updatePollPeriod(pollPeriod));
    configurePollingScheduler(pollPeriod);
  };
};