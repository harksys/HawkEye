import ActionConstants from 'Constants/Actions/Index';

export function setSetupIsLoading(isLoading: boolean)
{
  return {
    type      : ActionConstants.setup.SET_SETUP_IS_LOADING,
    isLoading
  };
};

export function setSetupShowLoading(showLoading: boolean)
{
  return {
    type        : ActionConstants.setup.SET_SETUP_SHOW_LOADING,
    showLoading
  };
};

export function setSetupRenderApp(renderApp: boolean)
{
  return {
    type      : ActionConstants.setup.SET_SETUP_RENDER_APP,
    renderApp
  };
};

export function setWindowFocussed(windowFocussed: boolean)
{
  return {
    type           : ActionConstants.setup.SET_WINDOW_FOCUSSED,
    windowFocussed
  };
};

export function setAltKeyDown(altKeyDown: boolean)
{
  return {
    type       : ActionConstants.setup.SET_ALT_KEY_DOWN,
    altKeyDown
  };
};

export function setWindowFullScreened(windowFullScreened: boolean)
{
  return {
    type               : ActionConstants.setup.SET_WINDOW_FULLSCREENED,
    windowFullScreened
  };
};