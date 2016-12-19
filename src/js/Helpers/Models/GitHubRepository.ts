import { makeGitHubUser } from './GitHubUser';

/**
 * @param  {any} repo
 * @returns IGitHubRepository
 */
export function makeGitHubRepository(repo: any): IGitHubRepository
{
  if (typeof repo.id === 'undefined') {
    return null;
  }

  return {
    id       : repo.id,
    name     : repo.name,
    fullName : repo.full_name,
    private  : repo.private,
    htmlUrl  : repo.html_url,
    owner    : makeGitHubUser(repo.owner)
  };
};