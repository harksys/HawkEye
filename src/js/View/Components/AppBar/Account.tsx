import * as React from 'react';

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

  render()
  {
    return (
      <Btn onClick={this.props.onClick.bind(null, this.props.account)}
           className={'btn--square-delta push-auto--sides'
                        + (this.props.currentAccountId !== this.props.account.gitHubUser.id
                             ? ' btn--dark-grey-brand'
                             : '')}>
        <div className="soft-kappa">
          <ProfilePicture picture={this.props.account.gitHubUser.avatarUrl} />
        </div>
      </Btn>
    );
  }
};

export default AppBarAccount;