import { getState } from 'Helpers/State/Store';

/**
 * @returns boolean
 */
export function isPolling(): boolean
{
  return getState<IState>().app.isPolling;
};

/**
 * @returns string
 */
export function getLastPoll(): string
{
  return getState<IState>().app.lastPoll;
};

/**
 * @returns number
 */
export function getCurrentAccountId(): number
{
  return getState<IState>().app.currentAccountId;
};