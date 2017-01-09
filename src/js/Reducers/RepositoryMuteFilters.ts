import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import { defaultRepositoryMuteFilter } from 'Constants/State/RepositoryMuteFilters';

import * as omit from 'lodash/omit';
import * as clone from 'lodash/clone';
import * as objectAssign from 'object-assign';

const initialState: IStateRepositoryMuteFilters = {

};

let reducingMethods = {
  [ActionConstants.repositoryMuteFilters.SETUP_FILTER] : (state: IStateRepositoryMuteFilters,
                                                          action : { accountId: number;
                                                                     repositoryId: string; }) =>
  {
    let accountState = getAccountState(state, action.accountId);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.repositoryId] : defaultRepositoryMuteFilter
      })
    });
  },
  [ActionConstants.repositoryMuteFilters.SET_REASON_FILTER] : (state: IStateRepositoryMuteFilters,
                                                               action : { accountId: number;
                                                                          repoId: string;
                                                                          filterName: string;
                                                                          enabled: boolean }) =>
  {
    let accountState = getAccountState(state, action.accountId);
    let repoState    = getRepositoryState(accountState, action.repoId);
    let filters      = clone(repoState.allowedReasons);

    /*
     * @todo: Clean this up
     */
    if (action.enabled
          && filters.indexOf(action.filterName) === -1) {
      filters.push(action.filterName);
    }

    if (!action.enabled
          && filters.indexOf(action.filterName) > -1) {
      filters = filters.filter(f => f !== action.filterName);
    }

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.repoId] : objectAssign({}, repoState, {
          allowedReasons : filters
        })
      })
    });
  },
  [ActionConstants.repositoryMuteFilters.SET_SUBJECT_FILTER] : (state: IStateRepositoryMuteFilters,
                                                                action : { accountId: number;
                                                                           repoId: string;
                                                                           filterName: string;
                                                                           enabled: boolean }) =>
  {
    let accountState = getAccountState(state, action.accountId);
    let repoState    = getRepositoryState(accountState, action.repoId);
    let filters      = clone(repoState.allowedSubjectTypes);

    /*
     * @todo: Clean this up
     */
    if (action.enabled
          && filters.indexOf(action.filterName) === -1) {
      filters.push(action.filterName);
    }

    if (!action.enabled
          && filters.indexOf(action.filterName) > -1) {
      filters = filters.filter(f => f !== action.filterName);
    }

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.repoId] : objectAssign({}, repoState, {
          allowedSubjectTypes : filters
        })
      })
    })
  },
  [ActionConstants.repositoryMuteFilters.REMOVE_FILTER] : (state: IStateRepositoryMuteFilters,
                                                           action: { accountId: number;
                                                                     repoId: string }) =>
  {
    let accountState = getAccountState(state, action.accountId);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, omit(accountState, action.repoId))
    })
  }
};

/**
 * @param  {IStateRepositoryMuteFilters} state
 * @param  {number} accountId
 * @returns IStateRepositoryMuteFiltersAccount
 */
function getAccountState(state: IStateRepositoryMuteFilters,
                         accountId: number): IStateRepositoryMuteFiltersAccount
{
  return state[accountId] || {};
};

/**
 * @param  {IStateRepositoryMuteFiltersAccount} accountState
 * @param  {string} repoId
 * @returns IStateRepositoryMuteFiltersAccountRepo
 */
function getRepositoryState(accountState: IStateRepositoryMuteFiltersAccount,
                            repoId: string): IStateRepositoryMuteFiltersAccountRepo
{
  return accountState[repoId] || defaultRepositoryMuteFilter;
};

export default Reducify(initialState, reducingMethods);