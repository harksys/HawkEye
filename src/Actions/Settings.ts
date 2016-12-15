import ActionConstants from 'Constants/Actions/Index';

export function setAuthenticationIsAuthenticating(isAuthenticating: boolean)
{
  return {
    type             : ActionConstants.settings.SET_SETTINGS_AUTH_IS_AUTHENTICATING,
    isAuthenticating : isAuthenticating
  };
};