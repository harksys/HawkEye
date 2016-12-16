import ActionConstants from 'Constants/Actions/Index';

export function addAccount(token: string, user: IGitHubUser)
{
  return {
    type  : ActionConstants.accounts.ADD_ACCOUNT,
    token,
    user
  };
};