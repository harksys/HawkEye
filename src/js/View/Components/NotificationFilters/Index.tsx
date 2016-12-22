import * as React from 'react';

import { createGitHubNotificationFilterSet } from 'Helpers/Models/GitHubNotificationFilterSet';

import NotificationFilterStringFilter from './NotificationFilterStringFilter';
import NotificationFilterRepositoryFilter from './NotificationFilterRepositoryFilter';

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
      <div className="soft-delta">
        <div className="grid">
          {filterSet.subjectTypes.length > 0
            ? <NotificationFilterStringFilter stringFilters={filterSet.subjectTypes}
                                              className="grid__item one-whole push-delta--bottom"
                                              getTitle={() => 'Subjects'}
                                              getFilterTitle={filter => filter.name} />
            : undefined}
          {filterSet.reasonTypes.length > 0
            ? <NotificationFilterStringFilter stringFilters={filterSet.reasonTypes}
                                              className="grid__item one-whole push-delta--bottom"
                                              getTitle={() => 'Reasons'}
                                              getFilterTitle={filter => filter.name} />
            : undefined}
          {filterSet.repositories.length > 0
            ? <NotificationFilterRepositoryFilter repositoryFilters={filterSet.repositories}
                                                  className="grid__item one-whole"
                                                  getTitle={() => 'Repositories'}
                                                  getFilterTitle={filter => filter.repository.fullName.toLowerCase()} />
            : undefined}
          </div>
      </div>
    );
  }
};

export default NotificationFilters;