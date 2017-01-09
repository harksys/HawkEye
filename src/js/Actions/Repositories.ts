import ActionConstants from 'Constants/Actions/Index';

/**
 * @param  {IGitHubRepository} repository
 */
export function addRepository(repository: IGitHubRepository)
{
  return {
    type       : ActionConstants.repositories.ADD_REPOSITORY,
    repository
  };
};