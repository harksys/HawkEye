
/**
 * @param  {any} user
 * @returns IGitHubUser
 */
export function makeGitHubUser(user: any): IGitHubUser
{
  if (typeof user.id === 'undefined') {
    return null;
  }

  let newUser: IGitHubUser = {
    id        : user.id,
    avatarUrl : user.avatar_url,
    name      : user.name,
    email     : user.email,
    createdAt : user.created_at,
    username  : user.login
  };

  return newUser;
};