import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { handleAddAccountClick } from 'Actions/UIActions/Accounts';

import {
  Btn,
  BtnTo
} from 'View/Ui/Index';
import ViewBar from 'View/Components/ViewBar/Index';

interface ISettingsIndexProps
{
  settings: IStateSettings;

  authentication: IStateAuthentication;

  accounts: IStateAccountsAccount[];
};

class SettingsIndex extends React.Component<ISettingsIndexProps, any>
{
  render()
  {
    return (
      <ViewBar title="Settings"
               backLink="/">
        <div className="soft-delta">
          <div className="grid">
            <div className="grid__item one-whole push-delta--bottom">
              <BtnTo to={'/settings/notifications'}
                     className={'btn--light-grey'}>
                {'Notifications'}
              </BtnTo>
            </div>
            <div className="grid__item one-whole">
              {this.props.accounts
                   .map((acc, i) =>
                   (
                     <BtnTo key={acc.gitHubUser.id}
                            to={'/settings/accounts/' + acc.gitHubUser.id}
                            className={'btn--light-grey'
                                          + (i === 0
                                              ? ' btn--hard-bottom'
                                              : '')
                                          + (i !== 0
                                              ? ' btn--hard'
                                              : '')}>
                       {'@' + acc.gitHubUser.username}
                     </BtnTo>
                   ))}
              <Btn className={this.props.accounts.length > 0
                                ? 'btn--hard-top'
                                : undefined}
                   onClick={this.handleClick.bind(this)}>
                {'Add Account'}
              </Btn>
            </div>
          </div>
        </div>
      </ViewBar>
    );
  }

  handleClick()
  {
    if (this.props.authentication.isAuthenticating) {
      return;
    }

    dispatch(handleAddAccountClick());
  }
};

export default connect(
  (state: IState) => ({
    settings       : state.settings,
    authentication : state.authentication,
    accounts       : Object.keys(state.accounts)
                           .map(id => state.accounts[id])
  })
)(SettingsIndex);