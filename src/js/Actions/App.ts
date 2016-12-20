import ActionConstants from 'Constants/Actions/Index';

export function setCurrentAccountId(currentAccountId: number)
{
  return {
    type             : ActionConstants.app.SET_CURRENT_ACCOUNT_ID,
    currentAccountId
  };
};

export function setIsPolling(isPolling: boolean)
{
  return {
    type      : ActionConstants.app.SET_APP_IS_POLLING,
    isPolling
  };
};

export function setLastPoll(lastPoll: string)
{
  return {
    type     : ActionConstants.app.SET_APP_LAST_POLL,
    lastPoll
  };
};