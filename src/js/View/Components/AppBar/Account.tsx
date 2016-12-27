import * as React from 'react';

import createMenu from 'Electron/Menus/Accounts';

import {
  Btn,
  ProfilePicture
} from 'View/Ui/Index';

interface IAppBarAccountProps
{
  account: IStateAccountsAccount;

  currentAccountId: number;

  className?: string;

  onClick?(account: IStateAccountsAccount);
};

class AppBarAccount extends React.Component<IAppBarAccountProps, any>
{
  static defaultProps = {
    onClick : () => {}
  };

  handleRightClick(e)
  {
    e.preventDefault();

    try {
      createMenu(this.props.account.gitHubUser.id)
        .popup(e.clientX, e.clientY);
    } catch (e) {}
  }

  render()
  {
    return (
      <Btn onClick={this.props.onClick.bind(null, this.props.account)}
           onContextMenu={this.handleRightClick.bind(this)}
           className={'btn--square-delta push-auto--sides'
                        + (this.props.currentAccountId !== this.props.account.gitHubUser.id
                             ? ' btn--scale-beta-brand'
                             : '')}>
        <div className="soft-kappa">
          <ProfilePicture picture={this.props.account.gitHubUser.avatarUrl} />
        </div>
      </Btn>
    );
  }
};

export default AppBarAccount;