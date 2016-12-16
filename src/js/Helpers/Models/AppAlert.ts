import { getState } from 'Helpers/State/Store';
import { generateId } from 'Helpers/Lang/String';

/**
 * @returns number
 */
export function getNextAppAlertIndex(): number
{
  let currentAlerts = getState<IState>()
                        .appAlerts
                        .alerts
                        .sort((a, b) => a.index - b.index);

  return currentAlerts.length < 1
           ? 1
           : currentAlerts[currentAlerts.length - 1].index + 1;
};

/**
 * @param  {string} message
 * @param  {string} status
 * @returns IAppAlert
 */
export function createAppAlert(message: string, status: string): IAppAlert
{
  let appAlert: IAppAlert = {
    id      : generateId(),
    index   : getNextAppAlertIndex(),
    show    : false,
    message : message,
    status  : status
  };

  return appAlert;
};