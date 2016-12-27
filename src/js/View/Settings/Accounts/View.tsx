import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { getAccount } from 'Helpers/Models/Accounts';
import { confirmRemoveAccount } from 'Electron/Dialogs/Accounts';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Btn,
  Scroll
} from 'View/Ui/Index';

interface IViewAccountSettingsProps extends ReactRouter.RouteComponentProps<{
                                              accountId: string;
                                            }, any>
{

};

class ViewAccountSettings extends React.Component<IViewAccountSettingsProps, any>
{
  render()
  {
    let account = getAccount(this.props.params.accountId);

    return (
      <ViewBar title="Account Settings"
               backLink="/settings">
        <Scroll>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-quarter mobile-display--hidden"></div>
              <div className="grid__item one-half mobile-one-whole">
                <div className="grid">
                  <div className="grid__item one-whole push-delta--bottom">
                    <div className="bg--scale-epsilon soft-zeta round">
                      <div className="grid">
                        <div className="grid__item one-third">
                          <img src={account.gitHubUser.avatarUrl}
                               className="profile-picture img-scale" />
                        </div>
                        <div className="grid__item two-thirds">
                          <h4 className="text--white">{account.gitHubUser.name}</h4>
                          <p className="text--white text--zeta">{'@' + account.gitHubUser.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item one-whole">
                    <Btn className="push-delta--bottom">
                      {'Update Details'}
                    </Btn>
                    <Btn className="btn--error push-delta--bottom">
                      {'Clear Current Notifications'}
                    </Btn>
                    <Btn className="btn--error"
                        onClick={() => confirmRemoveAccount(this.props.params.accountId)}>
                      Remove Account
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(ViewAccountSettings);