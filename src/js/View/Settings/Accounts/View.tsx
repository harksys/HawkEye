import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { dispatch } from 'Helpers/State/Store';
import { getAccount } from 'Helpers/Models/Accounts';
import {
  confirmRemoveAccount,
  confirmClearNotifications
} from 'Electron/Dialogs/Accounts';

import { updateAccount } from 'Actions/Accounts';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Btn,
  Scroll,
  RoundedBtnSet
} from 'View/Ui/Index';

interface IViewAccountSettingsProps extends ReactRouter.RouteComponentProps<{
                                              accountId: string;
                                            }, any>
{
  repositories: IStateRepositories;

  repositoryMuteFilters: IStateRepositoryMuteFiltersAccount;
};

class ViewAccountSettings extends React.Component<IViewAccountSettingsProps, any>
{
  handleRepositoryMuteFilterClick(repoId: string)
  {
    dispatch(push('/settings/accounts/'
                  + this.props.params.accountId
                  + '/repo-mute-filter/'
                  + repoId));
  }

  render()
  {
    let account = getAccount(this.props.params.accountId);

    return (
      <ViewBar title="Account Settings"
               backLink="/settings">
        <Scroll>
          <div className="grid account-settings-header">
            <div className="grid__item one-quarter mobile-display--hidden"></div>
            <div className="grid__item one-half mobile-one-whole">
              <div className="soft-delta">
                <div className="grid">
                  <div className="grid__item one-third">
                    <img src={account.gitHubUser.avatarUrl}
                          className="profile-picture img-scale" />
                  </div>
                  <div className="grid__item two-thirds">
                    <h4 className="account-settings__name">
                      {account.gitHubUser.name}
                    </h4>
                    <p className="account-settings__username text--zeta">
                      {'@' + account.gitHubUser.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-quarter mobile-display--hidden"></div>
              <div className="grid__item one-half mobile-one-whole">
                <div className="grid">
                  <div className="grid__item one-whole push-delta--bottom">
                    <Btn className="settings-btn"
                        onClick={() => dispatch(updateAccount(account.gitHubUser.id.toString(), true))}>
                      {'Update Details'}
                    </Btn>
                  </div>
                  {Object.keys(this.props.repositoryMuteFilters).length > 0
                    ? (
                        <div className="grid__item one-whole push-delta--bottom">
                          <label className="text--zeta push-zeta--bottom">
                            {'Repository Mute Filters'}
                          </label>
                          <RoundedBtnSet buttons={Object.keys(this.props.repositoryMuteFilters)
                                                        .map(repoId =>
                                                        {
                                                          let repository = this.props.repositories[repoId];

                                                          return {
                                                            key       : repoId,
                                                            text      : repository.fullName,
                                                            className : 'settings-btn truncate soft-zeta--sides',
                                                            onClick   : this.handleRepositoryMuteFilterClick.bind(this, repoId)
                                                          };
                                                        })} />
                        </div>
                      )
                    : undefined}
                  <div className="grid__item one-whole">
                    <label className="text--zeta push-zeta--bottom">Danger Zone</label>
                    <Btn className="btn--error push-zeta--bottom"
                        onClick={() => confirmClearNotifications(account.gitHubUser.id)}>
                      {'Clear Notifications'}
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
  (state: IState, props: IViewAccountSettingsProps) => ({
    repositories          : state.repositories,
    repositoryMuteFilters : state.repositoryMuteFilters[props.params.accountId] || {}
  })
)(ViewAccountSettings);