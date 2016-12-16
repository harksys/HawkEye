interface IRouting
{
  getHistory(): ReactRouter.History;

  getSyncdHistory(): ReactRouterRedux.ReactRouterReduxHistory;

  syncHistoryWithStore(store: Redux.Store<any>): IRouting;

  getRoutes(): ReactRouter.PlainRoute;

  addRouteConfig(routeConfig: ReactRouter.PlainRoute): IRouting;

  addRouteConfigs(...routeConfigs: ReactRouter.PlainRoute[]): IRouting;
};