import * as React from 'react';
import { connect } from 'react-redux';

import {
  Icon,
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
          {this.props.accounts
               .map(account =>
               (
                 <div key={account.gitHubUser.id}
                      className="soft-zeta">
                   <ProfilePicture picture={account.gitHubUser.avatarUrl} />
                 </div>
               ))}
        </div>
        <div className="hard-bottom__bottom">
          <Icon icon="world" />
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
