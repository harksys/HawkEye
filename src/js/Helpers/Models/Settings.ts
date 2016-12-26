import { getState } from 'Helpers/State/Store';

/**
 * @returns string
 */
export function getCurrentPollPeriod(): string
{
  return getState<IState>().settings.pollPeriod;
};

/**
 * @returns boolean
 */
export function alertSuccessSoundIsEnabled(): boolean
{
  return getState<IState>().settings.soundSettings.alertSuccessEnabled;
};

/**
 * @returns boolean
 */
export function alertErrorSoundIsEnabled(): boolean
{
  return getState<IState>().settings.soundSettings.alertErrorEnabled;
};

/**
 * @returns boolean
 */
export function newItemsSoundIsEnabled(): boolean
{
  return getState<IState>().settings.soundSettings.newItemsEnabled;
};

/**
 * @returns string
 */
export function getNotificationDoubleClickAction(): string
{
  return getState<IState>().settings.notifications.doubleClickAction;
};