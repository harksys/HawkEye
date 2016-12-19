import { updatePollPeriod } from 'Actions/Settings';

/**
 * @param  {string} pollPeriod
 */
export function configurePollPeriod(pollPeriod: string)
{
  return dispatch =>
  {
    dispatch(updatePollPeriod(pollPeriod));
  };
};