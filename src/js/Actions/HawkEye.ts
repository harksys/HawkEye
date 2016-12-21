import { getAccountIds } from 'Helpers/Models/Accounts';
import { wait } from 'Helpers/Lang/Timeout';
import { getCurrentPollPeriod } from 'Helpers/Models/Settings';

import {
  setSetupIsLoading,
  setSetupRenderApp,
  setSetupShowLoading
} from 'Actions/Setup';
import { updateAccounts } from 'Actions/Accounts';

import {
  pollingMethod,
  configurePollingScheduler
} from 'Helpers/System/Scheduler';

/**
 * @todo: lol more callback hell...fix this.
 */
export function appSetupFlow()
{
  return dispatch =>
  {
    /*
     * Render the application, and wait some time
     * for completion
     */
    dispatch(setSetupRenderApp(true));
    wait(250)
      .then(() =>
      {
        /*
         * Update the accounts we have stored.
         */
        dispatch(updateAccounts(() =>
        {
          pollingMethod(getAccountIds());

          /*
           * Setup our polling scheduler
           */
          configurePollingScheduler(getCurrentPollPeriod());

          /*
           * Hide the loading page, wait for it to fade out.
           * When it has, remove the loading screen from the DOM.
           */
          dispatch(setSetupShowLoading(false));
          wait(250)
            .then(() => dispatch(setSetupIsLoading(false)));
          }));
      });
  };
};