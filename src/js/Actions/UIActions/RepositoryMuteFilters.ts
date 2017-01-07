import * as get from 'lodash/get';
import { push } from 'react-router-redux';

import { getState } from 'Helpers/State/Store';

import { addRepository } from 'Actions/Repositories';
import { setupRepositoryMuteFilter as setupRepositoryMuteFilterInStore } from 'Actions/RepositoryMuteFilters';

/**
 * @param  {number} accountId
 * @param  {IGitHubRepository} repository
 * @param  {string=null} redirect
 */
export function setupRepositoryMuteFilter(accountId: number,
                                          repository: IGitHubRepository,
                                          redirect: string = null)
{
  return dispatch =>
  {
    let canRedirect = typeof redirect === 'string';

    let state          = getState<IState>();
    let existingFilter = get(state.repositoryMuteFilters, `${accountId}.${repository.id}`, undefined);

    /*
     * If we have an existing filter than go no further.
     * Although redirect if one has been set.
     */
    if (typeof existingFilter !== 'undefined') {
      if (canRedirect) {
        dispatch(push(redirect));
      }

      return;
    }

    /*
     * Store the repository in state, and setup the default filters
     */
    dispatch(addRepository(repository));
    dispatch(setupRepositoryMuteFilterInStore(accountId, repository.id.toString()));

    /*
     * Make sure we've let things setup, then redirect
     */
    setTimeout(() =>
    {
      if (!canRedirect) {
        return;
      }

      dispatch(push(redirect));
    }, 0);
  };
};