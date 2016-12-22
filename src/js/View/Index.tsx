import * as React from 'react';
import { connect } from 'react-redux';

import * as concat from 'lodash/concat';
import * as values from 'lodash/values';
import * as throttle from 'lodash/throttle';

import { sortingMethods } from 'Helpers/Lang/Sort';
import { filterNotificationsByFilteringSet } from 'Helpers/Models/GitHubNotification';
import { defaultNotificationFilterSet } from 'Constants/Models/NotificationFilterSet';

import ViewBar from 'View/Components/ViewBar/Index';
import NotificationsList from 'View/Components/NotificationsList/Index';
import NotificationFilters from 'View/Components/NotificationFilters/Index';

interface IAppIndexProps
{
  app: IStateApp;

  notifications: IStateNotifications;

  notificationFilters: IStateNotificationFilters;
};

class Index extends React.Component<IAppIndexProps, any>
{
  constructor(props)
  {
    super(props);

    this.handleFilterNotifications = throttle(this.handleFilterNotifications, 250);
  }

  handleFilterNotifications(notifications: IGitHubNotification[],
                           filterSet: INotificationFilterSet): IGitHubNotification[]
  {
    return filterNotificationsByFilteringSet(notifications, filterSet);
  }

  render()
  {
    let notifications = values(this.props.notifications[this.props.app.currentAccountId] || {});
    let filterRules   = (this.props.notificationFilters[this.props.app.currentAccountId]
                            || defaultNotificationFilterSet);

    let filteredNotifications = this.handleFilterNotifications(notifications, filterRules)
                                    .sort(sortingMethods.dateDesc('updatedAt'));

    return (
      <ViewBar title={'Notifications - ' + filteredNotifications.length}>
        <div className="hideable-left">
          <div className="hideable-left__left bg--lighter-grey">
            <NotificationFilters accountId={this.props.app.currentAccountId}
                                 notifications={notifications}
                                 notificationFilters={filterRules} />
          </div>
          <div className="hideable-left__content no-outline">
            <NotificationsList notifications={filteredNotifications} />
          </div>
        </div>
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState, props: IAppIndexProps) => ({
    app                 : state.app,
    notifications       : state.notifications,
    notificationFilters : state.notificationFilters
  })
)(Index);