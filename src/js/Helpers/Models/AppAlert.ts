import HawkEyeConfig from 'Config/HawkEye';

import {
  alertErrorSoundIsEnabled,
  alertSuccessSoundIsEnabled
} from 'Helpers/Models/Settings';
import { getState } from 'Helpers/State/Store';
import { playSound } from 'Helpers/Lang/Audio';
import { generateId } from 'Helpers/Lang/String';

import { soundClipPaths } from 'Constants/Resources/Sound';
import { appAlertStatuses } from 'Constants/Models/AppAlert';


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
 * @returns number
 */
export function getAppAlertShowForTime(): number
{
  return HawkEyeConfig.appAlerts.showFor;
};

/**
 * @param  {IAppAlert} alert
 */
export function attemptToPlayAlertSound(alert: IAppAlert)
{
  // @todo: Clean this up
  if (alert.status == appAlertStatuses.error
        || alert.status === appAlertStatuses.warning) {
    let soundFile = soundClipPaths.harkError;

    if (alertErrorSoundIsEnabled()) {
      playSound(soundClipPaths.harkError)
    }
    return;
  }

  if (!alertSuccessSoundIsEnabled()) {
    return;
  }

  playSound(soundClipPaths.harkSuccess);
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

/**
 * @param  {string} message
 * @returns IAppAlert
 */
export function createSuccessAppAlert(message: string): IAppAlert
{
  return createAppAlert(message, appAlertStatuses.success);
};

/**
 * @param  {string} message
 * @returns IAppAlert
 */
export function createWarningAppAlert(message: string): IAppAlert
{
  return createAppAlert(message, appAlertStatuses.warning);
};

/**
 * @param  {string} message
 * @returns IAppAlert
 */
export function createErrorAppAlert(message: string): IAppAlert
{
  return createAppAlert(message, appAlertStatuses.error);
};