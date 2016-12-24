import * as React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { dispatch } from 'Helpers/State/Store';
import {
  setAltKeyDown,
  setWindowFocussed
} from 'Actions/Setup';

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
      <div className={'app '
                        + (this.props.setup.windowFocussed
                            ? 'app--focussed'
                            : 'app--blurred')}>
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

  handleSetWindowFocussed(e)
  {
    dispatch(setWindowFocussed(true));
  }

  handleSetWindowBlurred()
  {
    dispatch(setWindowFocussed(false));
  }

  handleKeydown(e)
  {
    if (!e.altKey) {
      return;
    }

    dispatch(setAltKeyDown(true));
  }

  handleKeyup(e)
  {
    if (!this.props.setup.altKeyDown) {
      return;
    }

    dispatch(setAltKeyDown(false));
  }

  componentDidMount()
  {
    window.addEventListener('focus', this.handleSetWindowFocussed.bind(this));
    window.addEventListener('blur', this.handleSetWindowBlurred.bind(this));
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  componentWillUnmount()
  {
    window.removeEventListener('focus', this.handleSetWindowFocussed.bind(this));
    window.removeEventListener('blur', this.handleSetWindowBlurred.bind(this));
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
    window.removeEventListener('keyup', this.handleKeyup.bind(this));
  }
};

export default connect<{}, {}, IContainerProps>(
  (state: IState) => ({
    setup : state.setup
  })
)(Container);