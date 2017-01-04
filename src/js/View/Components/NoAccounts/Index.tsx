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
        <h2 className="no-accounts__title push-zeta--bottom">
          {'Welcome to Hawk Eye'}
        </h2>
        <p className="no-accounts__text push-delta--bottom">
          {'Let\'s get started by adding a GitHub account.'}
        </p>
        <Btn className="no-accounts__btn max-width--200 push-auto--sides"
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