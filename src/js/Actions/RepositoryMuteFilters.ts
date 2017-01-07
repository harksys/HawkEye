import ActionConstants from 'Constants/Actions/Index';

export function setupRepositoryMuteFilter(accountId: number, repositoryId: string)
{
  return {
    type         : ActionConstants.repositoryMuteFilters.SETUP_FILTER,
    accountId,
    repositoryId
  };
};

export function setReasonFilter(accountId: number,
                                repoId: string,
                                filterName: string,
                                enabled: boolean)
{
  return {
    type       : ActionConstants.repositoryMuteFilters.SET_REASON_FILTER,
    accountId,
    repoId,
    filterName,
    enabled
  };
};

export function setSubjectFilter(accountId: number,
                                 repoId: string,
                                 filterName: string,
                                 enabled: boolean)
{
  return {
    type       : ActionConstants.repositoryMuteFilters.SET_SUBJECT_FILTER,
    accountId,
    repoId,
    filterName,
    enabled
  };
};