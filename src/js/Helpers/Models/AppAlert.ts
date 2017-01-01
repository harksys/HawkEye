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

interface IAppAlertActionParams
{
  stickyActionIcon?: string;

  stickyActionName?: string;

  stickyActionParams?: any;
};

/**
 * @param  {string} message
 * @param  {string} status
 * @returns IAppAlert
 */
export function createAppAlert(message: string,
                               status: string,
                               sticky: boolean = false,
                               actionParams: IAppAlertActionParams = {}): IAppAlert
{
  let appAlert: IAppAlert = {
    id                 : generateId(),
    index              : getNextAppAlertIndex(),
    show               : false,
    message            : message,
    status             : status,
    sticky             : sticky,
    stickyActionIcon   : actionParams.stickyActionIcon || null,
    stickyActionName   : actionParams.stickyActionName || null,
    stickyActionParams : actionParams.stickyActionParams || {}
  };

  return appAlert;
};

/**
 * @param  {string} message
 * @returns IAppAlert
 */
export function createSuccessAppAlert(message: string,
                                      sticky: boolean = false,
                                      actionParams: IAppAlertActionParams = {}): IAppAlert
{
  return createAppAlert(message, appAlertStatuses.success, sticky, actionParams);
};

/**
 * @param  {string} message
 * @returns IAppAlert
 */
export function createWarningAppAlert(message: string,
                                      sticky: boolean = false,
                                      actionParams: IAppAlertActionParams = {}): IAppAlert
{
  return createAppAlert(message, appAlertStatuses.warning, sticky, actionParams);
};

/**
 * @param  {string} message
 * @returns IAppAlert
 */
export function createErrorAppAlert(message: string,
                                    sticky: boolean = false,
                                    actionParams: IAppAlertActionParams = {}): IAppAlert
{
  return createAppAlert(message, appAlertStatuses.error, sticky, actionParams);
};