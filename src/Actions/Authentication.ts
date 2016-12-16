import ActionConstants from 'Constants/Actions/Index';

export function setIsAuthenticating(isAuthenticating: boolean)
{
  return {
    type             : ActionConstants.authentication.SET_IS_AUTHENTICATING,
    isAuthenticating
  };
};