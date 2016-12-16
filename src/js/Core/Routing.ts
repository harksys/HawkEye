///<reference path="./Interfaces/IRouting.ts" />

import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

class Routing implements IRouting
{
  public routes: ReactRouter.PlainRoute;

  public historyInstance: ReactRouter.History;

  public syncdHistory: ReactRouterRedux.ReactRouterReduxHistory;

  public childRoutes: ReactRouter.PlainRoute[];

  /**
   * @param  {any} appContainer
   */
  constructor(appContainer: any)
  {
    /*
     * Setup the default chilRoutes and
     * store the historyInstance
     */
    this.childRoutes     = [];
    this.historyInstance = hashHistory;

    /*
     * Set root-application routes
     * and assign the childRoutes
     */
    this.routes = {
      childRoutes : [{
        path        : '/',
        component   : appContainer,
        childRoutes : this.childRoutes
      }]
    };
  }

  /**
   * @returns ReactRouter
   */
  public getHistory = (): ReactRouter.History =>
  {
    return this.historyInstance;
  }

  /**
   * @param  {Redux.Store<any>} store
   * @returns IRouting
   */
  public syncHistoryWithStore = (store: Redux.Store<any>): IRouting =>
  {
    this.syncdHistory = syncHistoryWithStore(this.historyInstance, store);

    return this;
  };

  /**
   * @returns ReactRouterRedux
   */
  public getSyncdHistory = (): ReactRouterRedux.ReactRouterReduxHistory =>
  {
    return this.syncdHistory;
  }

  /**
   * @returns ReactRouter
   */
  public getRoutes = (): ReactRouter.PlainRoute =>
  {
    return this.routes;
  }

  /**
   * @param  {ReactRouter.PlainRoute} routeConfig
   */
  public addRouteConfig = (routeConfig: ReactRouter.PlainRoute) =>
  {
    this.childRoutes.push(routeConfig);

    return this;
  }

  /**
   * @param  {ReactRouter.PlainRoute[]} ...routingConfigurations
   */
  public addRouteConfigs = (...routingConfigurations: ReactRouter.PlainRoute[]) =>
  {
    routingConfigurations.forEach(c => this.addRouteConfig(c));

    return this;
  }
};

export default Routing;