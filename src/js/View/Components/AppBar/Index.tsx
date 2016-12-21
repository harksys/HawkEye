import * as React from 'react';
import { connect } from 'react-redux';

import { switchAccount } from 'Actions/UIActions/App';
import { dispatch } from 'Helpers/State/Store';

import {
  Btn,
  Icon,
  BtnTo,
  Scroll,
  CenteredBox,
  ProfilePicture
} from 'View/Ui/Index';

interface IAppBarProps
{
  app?: IStateApp;

  accounts?: IStateAccountsAccount[];
};

class AppBar extends React.Component<IAppBarProps, any>
{
  render()
  {
    return (
      <div className="hard-bottom hard-bottom--delta">
        <div className="hard-bottom__content">
          <Scroll>
            {this.props.accounts
                .map(account =>
                (
                  <div key={account.gitHubUser.id}
                        className="soft-zeta hard--bottom">
                    <Btn onClick={() => dispatch(switchAccount(account.gitHubUser.id))}
                          className={'btn--square-delta'
                                        + (this.props.app.currentAccountId != account.gitHubUser.id
                                            ? ' btn--dark-grey-brand'
                                            : '')}>
                      <div className="soft-kappa">
                        <ProfilePicture picture={account.gitHubUser.avatarUrl} />
                      </div>
                    </Btn>
                  </div>
                ))}
          </Scroll>
        </div>
        <div className="hard-bottom__bottom bg--dark-grey">
          <div className="soft-zeta">
            <BtnTo to="/settings"
                   className="btn--square-delta text--beta">
              <Icon icon="settings" />
            </BtnTo>
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
