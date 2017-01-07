import * as React from 'react';
import * as get from 'lodash/get';
import { connect } from 'react-redux';
import * as Octicon from 'react-octicon';

import { dispatch } from 'Helpers/State/Store';

import {
  gitHubNotificationReasonTypes,
  githubNotificationSubjectTypes,
  gitHubNotificationReasonTypePrettyNames,
  gitHubNotificationSubjectTypePrettyNames
} from 'Constants/Services/GitHub';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Btn,
  Scroll,
  Toggle,
  CenteredBox,
} from 'View/Ui/Index';

interface IAccountRepositoryMuteFilterProps extends ReactRouter.RouteComponentProps<{
                                                      accountId: number;
                                                      repoId: string;
                                                    }, any>
{
  repository: IGitHubRepository;

  repositoryMuteFilter: IStateRepositoryMuteFiltersAccountRepo;
};

class AccountRepositoryMuteFilter extends React.Component<IAccountRepositoryMuteFilterProps, any>
{
  render()
  {
    if (typeof this.props.repository === 'undefined'
          || typeof this.props.repositoryMuteFilter === 'undefined') {
      return <p>Error!</p>;
    }

    return (
      <ViewBar title={'Edit Mute Filter'}
               backLink={'/settings/accounts/' + this.props.params.accountId}
               getRightContent={() =>
               (
                 <CenteredBox>
                   <a href="#"
                      className={'view-bar__settings__right-icon '
                                  + 'view-bar__settings__right-icon--delete'}>
                     <Octicon name="x" />
                   </a>
                 </CenteredBox>
               )}>
        <Scroll>
          <div className="grid account-settings-header">
            <div className="grid__item one-quarter mobile-display--hidden"></div>
            <div className="grid__item one-half mobile-one-whole">
              <div className="soft-delta text--center truncate">
                <Octicon name={this.props.repository.private
                                 ? 'lock'
                                 : 'repo'}
                         className="display--inline text--betaw" />
                <p className="display--inline text--delta push-zeta--left account-settings__repo">
                  {this.props.repository.fullName}
                </p>
              </div>
            </div>
          </div>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-half mobile-one-whole">
                <label className="push-delta--bottom">Reasons</label>
                <div className="grid">
                  {Object.keys(gitHubNotificationReasonTypes)
                         .map(type =>
                         {
                           let t = gitHubNotificationReasonTypes[type];

                           return (
                             <div key={type}
                                  className="grid__item one-whole push-delta--bottom">
                               <label className="text--zeta push-zeta--bottom">{gitHubNotificationReasonTypePrettyNames[t]}</label>
                               <Toggle options={[{
                                         index : 1,
                                         text  : 'Keep',
                                         value : true
                                       }, {
                                         index : 2,
                                         text  : 'Ignore',
                                         value : false
                                       }]}
                                       value={this.props.repositoryMuteFilter.allowReasons.indexOf(type) > -1}
                                       onChange={val => { console.log(val); }} />
                             </div>
                           );
                         })}
                </div>
              </div>
              <div className="grid__item one-half mobile-one-whole">
                <label className="push-delta--bottom">Subject Types</label>
                <div className="grid">
                  {Object.keys(githubNotificationSubjectTypes)
                         .map(type =>
                         {
                           let t = githubNotificationSubjectTypes[type];

                           return (
                             <div key={type}
                                  className="grid__item one-whole push-delta--bottom">
                               <label className="text--zeta push-zeta--bottom">
                                 {gitHubNotificationSubjectTypePrettyNames[t]}
                               </label>
                               <Toggle options={[{
                                         index : 1,
                                         text  : 'Keep',
                                         value : true
                                       }, {
                                         index : 2,
                                         text  : 'Ignore',
                                         value : false
                                       }]}
                                       value={this.props.repositoryMuteFilter.allowedSubjectTypes.indexOf(type) > -1}
                                       onChange={val => { console.log(val); }} />
                             </div>
                           );
                         })}
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
  (state: IState, props: IAccountRepositoryMuteFilterProps) => ({
    repository           : state.repositories[props.params.repoId],
    repositoryMuteFilter : get(state.repositoryMuteFilters,
                               `${props.params.accountId}.${props.params.repoId}`,
                               undefined)
  })
)(AccountRepositoryMuteFilter);