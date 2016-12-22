import * as React from 'react';

import { createGitHubNotificationFilterSet } from 'Helpers/Models/GitHubNotificationFilterSet';

interface INotificationFiltersProps
{
  notifications: IGitHubNotification[];
};

class NotificationFilters extends React.Component<INotificationFiltersProps, any>
{
  render()
  {
    return (
      <div className="">
        {'Test'}
      </div>
    );
  }
};

export default NotificationFilters;