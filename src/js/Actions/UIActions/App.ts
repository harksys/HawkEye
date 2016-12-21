import { replace } from 'react-router-redux';
import { setCurrentAccountId } from 'Actions/App';

/**
 * @param  {number} accountId
 */
export function switchAccount(accountId: number)
{
  return dispatch =>
  {
    dispatch(setCurrentAccountId(accountId));
    dispatch(replace('/'));
  };
};