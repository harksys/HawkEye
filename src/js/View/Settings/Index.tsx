import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { setColorMode } from 'Actions/Settings';
import { handleAddAccountClick } from 'Actions/UIActions/Accounts';

import { colorModes } from 'Constants/Models/Settings';

import {
  Btn,
  BtnTo,
  Scroll,
  Toggle
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
  handleColorModeChange(mode)
  {
    dispatch(setColorMode(mode));
  }

  render()
  {
    return (
      <ViewBar title="Settings"
               backLink="/">
        <Scroll>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-half mobile-one-whole push-delta--bottom">
                <label className="push-zeta--bottom">General Settings</label>
                <BtnTo to={'/settings/notifications'}
                      className={'btn--hard-bottom settings-btn'}>
                  {'Notifications'}
                </BtnTo>
                <BtnTo to={'/settings/frequency'}
                      className={'btn--hard settings-btn'}>
                  {'Frequency'}
                </BtnTo>
                <BtnTo to={'/settings/sound'}
                      className={'btn--hard-top settings-btn push-delta--bottom'}>
                  {'Sounds'}
                </BtnTo>
                <label className="push-zeta--bottom">Color Mode</label>
                <Toggle value={this.props.settings.colorMode}
                        options={[{
                          index : 1,
                          text  : 'Dark',
                          value : colorModes.dark
                        }, {
                          index : 2,
                          text  : 'Light',
                          value : colorModes.light
                        }]}
                        onChange={this.handleColorModeChange.bind(this)} />
              </div>
              <div className="grid__item one-half mobile-one-whole">
                <label className="push-zeta--bottom">Account Settings</label>
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
          </div>
        </Scroll>
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