import ActionConstants from 'Constants/Actions/Index';

export function setCurrentAccountId(currentAccountId: string)
{
  return {
    type             : ActionConstants.app.SET_CURRENT_ACCOUNT_ID,
    currentAccountId
  };
};