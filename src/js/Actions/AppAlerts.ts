import ActionConstants from 'Constants/Actions/Index';

import {
  getAppAlertShowForTime,
  attemptToPlayAlertSound
} from 'Helpers/Models/AppAlert';
import { wait } from 'Helpers/Lang/Timeout';
import { getState } from 'Helpers/State/Store';

/**
 * @param  {IAppAlert} appAlert
 */
export function pushAppAlert(appAlert: IAppAlert)
{
  return dispatch =>
  {
    appAlert.show = false;

    /*
     * Render the App Alert, and then wait to attempt
     * to make sure it's rendered.
     */
    dispatch(addAppAlert(appAlert));
    wait(100)
      .then(() =>
      {
        /*
         * Hide all the current alerts,
         * and show our new alert.
         */
        dispatch(hideAllAppAlerts());
        dispatch(showAppAlert(appAlert.id));

        /*
         * Attempt to play an alert sound
         */
        attemptToPlayAlertSound(appAlert);

        if (appAlert.sticky) {
          return;
        }

        /*
         * Wait 5 seconds for the user to read.
         */
        wait(getAppAlertShowForTime())
          .then(() =>
          {
            /*
             * Animate the alert out, and then
             * wait for it to finish. When it's done,
             * we remove it from the DOM and state.
             */
            dispatch(hideAppAlert(appAlert.id));
            wait(250)
              .then(() => dispatch(removeAppAlert(appAlert.id)));
          })
      });
  };
};

/**
 * @param  {string} appAlertId
 */
export function closeAppAlert(appAlertId: string)
{
  return dispatch =>
  {
    dispatch(hideAppAlert(appAlertId));
    wait(250)
      .then(() => dispatch(removeAppAlert(appAlertId)));
  };
}

/**
 * @param  {IAppAlert} appAlert
 */
export function addAppAlert(appAlert: IAppAlert)
{
  return {
    type     : ActionConstants.appAlerts.ADD_APP_ALERT,
    appAlert
  };
};

/**
 * @param  {string} appAlertId
 */
export function removeAppAlert(appAlertId: string)
{
  return {
    type       : ActionConstants.appAlerts.REMOVE_APP_ALERT,
    appAlertId
  };
};

/**
 * @param  {string} appAlertId
 */
export function showAppAlert(appAlertId: string)
{
  return {
    type       : ActionConstants.appAlerts.SHOW_APP_ALERT,
    appAlertId
  };
};

/**
 * @param  {string} appAlertId
 */
export function hideAppAlert(appAlertId: string)
{
  return {
    type       : ActionConstants.appAlerts.HIDE_APP_ALERT,
    appAlertId
  };
};

/**
 */
export function hideAllAppAlerts()
{
  return {
    type : ActionConstants.appAlerts.HIDE_ALL_APP_ALERTS
  };
};