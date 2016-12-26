import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { switchAccount } from 'Actions/UIActions/App';

import {
  Icon,
  BtnTo,
  Scroll,
} from 'View/Ui/Index';

import Account from './Account';

interface IAppBarProps
{
  app?: IStateApp;

  accounts?: IStateAccountsAccount[];
};

class AppBar extends React.Component<IAppBarProps, any>
{
  handleAccountClick(account: IStateAccountsAccount)
  {
    dispatch(switchAccount(account.gitHubUser.id));
  }

  render()
  {
    return (
      <div className="hard-top hard-top--epsilon">
        <div className="hard-top__top">
        </div>
        <div className="hard-top__content">
          <div className="hard-bottom hard-bottom--delta app-drag">
            <div className="hard-bottom__content">
              <Scroll>
                {this.props.accounts
                    .map((account, i, a) =>
                    (
                      <div key={account.gitHubUser.id}
                            className={'soft-zeta hard--bottom'
                                        + (i === 0
                                              ? ' hard--top'
                                              : '')}>
                        <Account account={account}
                                 currentAccountId={this.props.app.currentAccountId}
                                 onClick={this.handleAccountClick.bind(this)} />
                      </div>
                    ))}
              </Scroll>
            </div>
            <div className="hard-bottom__bottom bg--scale-beta">
              <div className="soft-zeta">
                <BtnTo to="/settings"
                      className="btn--square-delta text--beta btn--transparent push-auto--sides">
                  <Icon icon="settings"
                        className="position--relative top--mu" />
                </BtnTo>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(
  (state: IState, props: IAppBarProps) => ({
    app      : state.app,
    accounts : Object.keys(state.accounts)
                     .map(id => state.accounts[id])

  })
)(AppBar as any);
