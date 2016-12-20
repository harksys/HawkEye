import { getState } from 'Helpers/State/Store';

/**
 * @returns string
 */
export function getCurrentPollPeriod(): string
{
  return getState<IState>().settings.pollPeriod;
};