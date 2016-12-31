import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { handleAddAccountClick } from 'Actions/UIActions/Accounts';

import {
  Btn,
  BtnTo
} from 'View/Ui/Index';

interface IAccountsSettingsSectionProps
{
  settings: IStateSettings;

  accounts?: IStateAccountsAccount[];

  authentication?: IStateAuthentication;
};

class AccountsSettingsSection extends React.Component<IAccountsSettingsSectionProps, any>
{
  handleClick()
  {
    if (this.props.authentication.isAuthenticating) {
      return;
    }

    dispatch(handleAddAccountClick());
  }

  render()
  {
    return (
      <div className="grid">
        <div className="grid__item one-whole">
          <label className="text--zeta push-zeta--bottom">Accounts</label>
          {this.props.accounts
              .map((acc, i) =>
              (
                <BtnTo key={acc.gitHubUser.id}
                        to={'/settings/accounts/' + acc.gitHubUser.id}
                        className={'settings-btn'
                                      + (i === 0
                                          ? ' btn--hard-bottom'
                                          : '')
                                      + (i !== 0
                                          ? ' btn--hard'
                                          : '')}>
                  {'@' + acc.gitHubUser.username}
                </BtnTo>
              ))}
          <Btn className={'settings-btn settings-btn--major'
                            + (this.props.accounts.length > 0
                                ? ' btn--hard-top'
                                : undefined)}
              onClick={this.handleClick.bind(this)}>
            {'Add Account'}
          </Btn>
        </div>
      </div>
    );
  }
};

export default connect<{}, {}, IAccountsSettingsSectionProps>(
  (state: IState) => ({
    authentication : state.authentication,
    accounts       : Object.keys(state.accounts)
                           .map(id => state.accounts[id])
  })
)(AccountsSettingsSection);