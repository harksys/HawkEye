import * as React from 'react';

import {
  getNotificationReasonPrettyName,
  getNotificationSubjectPrettyName
} from 'Helpers/Services/GitHub';
import { createGitHubNotificationFilterSet } from 'Helpers/Models/GitHubNotificationFilterSet';

import NotificationFilterStringFilter from './NotificationFilterStringFilter';
import NotificationFilterRepositoryFilter from './NotificationFilterRepositoryFilter';

import { Scroll } from 'View/Ui/Index';

interface INotificationFiltersProps
{
  notifications: IGitHubNotification[];
};

class NotificationFilters extends React.Component<INotificationFiltersProps, any>
{
  render()
  {
    let filterSet = createGitHubNotificationFilterSet(this.props.notifications);

    return (
      <Scroll>
        <div className="grid">
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