import ActionConstants from 'Constants/Actions/Index';

export function setSetupIsLoading(isLoading: boolean)
{
  return {
    type      : ActionConstants.setup.SET_SETUP_IS_LOADING,
    isLoading
  };
};

export function setSetupRenderApp(renderApp: boolean)
{
  return {
    type      : ActionConstants.setup.SET_SETUP_RENDER_APP,
    renderApp
  };
};