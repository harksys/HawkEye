import ActionConstants from 'Constants/Actions/Index';

export function setupRepositoryMuteFilter(accountId: number, repositoryId: string)
{
  return {
    type         : ActionConstants.repositoryMuteFilters.SETUP_FILTER,
    accountId,
    repositoryId
  };
};