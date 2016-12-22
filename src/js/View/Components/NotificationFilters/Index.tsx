import * as React from 'react';

import {
  getNotificationReasonPrettyName,
  getNotificationSubjectPrettyName
} from 'Helpers/Services/GitHub';
import { createGitHubNotificationFilterSet } from 'Helpers/Models/GitHubNotificationFilterSet';

import NotificationFilterStringFilter from './NotificationFilterStringFilter';
import NotificationFilterRepositoryFilter from './NotificationFilterRepositoryFilter';

import {
  Btn,
  Icon,
  Scroll
} from 'View/Ui/Index';

interface INotificationFiltersProps
{
  accountId: number;

  notifications: IGitHubNotification[];

  notificationFilters: INotificationFilterSet;
};

class NotificationFilters extends React.Component<INotificationFiltersProps, any>
{
  render()
  {
    let filterSet = createGitHubNotificationFilterSet(this.props.notifications);

    return (
      <Scroll>
        <div className="grid">
          <div className="grid__item one-whole">
            <div className="soft-delta">
              <label className="display--inline-block push-zeta--right">{'Filters'}</label>
              <Btn className="btn--small-icon btn--error display--inline-block position--relative n-top--nu">
                <Icon icon="close" />
              </Btn>
            </div>
          </div>
          <div className="grid__item one-whole">
            <div className="soft-delta--right push-iota--bottom">
              <Btn className="btn--hard-right btn--pill btn--pill-has-count">
                {'Read'}
                <span className="btn-pill__count">{filterSet.read}</span>
              </Btn>
            </div>
          </div>
          {filterSet.subjectTypes.length > 0
            ? <NotificationFilterStringFilter stringFilters={filterSet.subjectTypes}
                                              className="grid__item one-whole"
                                              getTitle={() => 'Subjects'}
                                              getFilterTitle={filter => getNotificationSubjectPrettyName(filter.name)} />
            : undefined}
          {filterSet.reasonTypes.length > 0
            ? <NotificationFilterStringFilter stringFilters={filterSet.reasonTypes}
                                              className="grid__item one-whole"
                                              getTitle={() => 'Reasons'}
                                              getFilterTitle={filter => getNotificationReasonPrettyName(filter.name)} />
            : undefined}
          {filterSet.repositories.length > 0
            ? <NotificationFilterRepositoryFilter repositoryFilters={filterSet.repositories}
                                                  className="grid__item one-whole"
                                                  getTitle={() => 'Repositories'}
                                                  getFilterTitle={filter => filter.repository.fullName.toLowerCase()} />
            : undefined}
        </div>
      </Scroll>
    );
  }
};

export default NotificationFilters;