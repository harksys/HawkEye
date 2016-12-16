import ActionConstants from 'Constants/Actions/Index';
import { getState } from 'Helpers/State/Store';
import { wait } from 'Helpers/Lang/Timeout';

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
    wait(0)
      .then(() =>
      {
        /*
         * Hide all the current alerts,
         * and show our new alert.
         */
        dispatch(hideAllAppAlerts());
        dispatch(showAppAlert(appAlert.id));

        /*
         * Wait 5 seconds for the user to read.
         */
        wait(5000)
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