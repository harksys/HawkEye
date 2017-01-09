import { getState } from 'Helpers/State/Store';

/**
 * @param  {number} accountId
 * @returns IStateRepositoryMuteFiltersAccount
 */
export function getAccountRepositoryMuteFilters(accountId: string): IStateRepositoryMuteFiltersAccount
{
  return getState<IState>().repositoryMuteFilters[accountId] || {};
};