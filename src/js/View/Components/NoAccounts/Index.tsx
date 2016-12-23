import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { handleAddAccountClick } from 'Actions/UIActions/Accounts';

import {
  Btn,
  CenteredBox
} from 'View/Ui/Index';

interface INoAccountsProps
{
  authentication?: IStateAuthentication;
};

class NoAccounts extends React.Component<INoAccountsProps, any>
{
  render()
  {
    return (
      <CenteredBox>
        <h2 className="push-zeta--bottom">{'Welcome to HawkEye'}</h2>
        <p className="push-delta--bottom">
          {'Let\'s get started by adding a GitHub account.'}
        </p>
        <Btn className="max-width--240 push-auto--sides"
             onClick={this.handleAddAccountClick.bind(this)}>
          {'Add an Account'}
        </Btn>
      </CenteredBox>
    );
  }

  handleAddAccountClick()
  {
    if (this.props.authentication.isAuthenticating) {
      return;
    }

    dispatch(handleAddAccountClick());
  }
};

export default connect<{}, {}, INoAccountsProps>(
  (state: IState, props: INoAccountsProps) => ({
    authentication : state.authentication
  })
)(NoAccounts);