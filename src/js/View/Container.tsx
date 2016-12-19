import * as React from 'react';
import { connect } from 'react-redux';

import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AppLoading } from 'View/Ui/Index';

interface IContainerProps
{
  store: Redux.Store<any>;

  history: ReactRouterRedux.ReactRouterReduxHistory;

  routes: ReactRouter.PlainRoute;

  setup?: IStateSetup;
};

class Container extends React.Component<IContainerProps, any>
{
  render()
  {
    return (
      <div className="app">
        {this.props.setup.isLoading
          ? <AppLoading show={this.props.setup.showLoading} />
          : undefined}
        {this.props.setup.renderApp
          ? (
              <Provider store={this.props.store}>
                <Router history={this.props.history}
                        routes={this.props.routes} />
              </Provider>
            )
          : undefined}
      </div>
    );
  }
};

export default connect<{}, {}, IContainerProps>(
  (state: IState) => ({
    setup : state.setup
  })
)(Container);