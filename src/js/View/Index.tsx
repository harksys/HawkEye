import * as React from 'react';
import { connect } from 'react-redux';
import * as Octicon from 'react-octicon';

import * as values from 'lodash/values';
import * as throttle from 'lodash/throttle';


import {
  doubleClickNotification,
  markMultipleNotificationsAsRead
} from 'Actions/UIActions/Notifications';
import { defaultNotificationFilterSet } from 'Constants/Models/NotificationFilterSet';

import { dispatch } from 'Helpers/State/Store';
import { sortingMethods } from 'Helpers/Lang/Sort';
import { getAccountIds } from 'Helpers/Models/Accounts';
import { filterNotificationsByFilteringSet } from 'Helpers/Models/GitHubNotification';

import {
  Icon,
  Loader,
  CenteredBox,
} from 'View/Ui/Index';
import ViewBar from 'View/Components/ViewBar/Index';
import NoAccounts from 'View/Components/NoAccounts/Index';
import NoNotifications from 'View/Components/NoNotifications/Index';
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

  handleMarkAllNotificationsAsRead(notifications: IGitHubNotification[])
  {
    dispatch(markMultipleNotificationsAsRead(this.props.app.currentAccountId, notifications));
  }

  handleNotificationDoubleClick(notification: IGitHubNotification)
  {
    dispatch(doubleClickNotification(this.props.app.currentAccountId, notification));
  }

  render()
  {
    let notifications = values(this.props.notifications[this.props.app.currentAccountId] || {});
    let filterRules   = (this.props.notificationFilters[this.props.app.currentAccountId]
                            || defaultNotificationFilterSet);

    let filteredNotifications = this.handleFilterNotifications(notifications, filterRules)
                                    .sort(sortingMethods.dateDesc('updatedAt'));

    /*
     * If there are no accounts set up, then
     * render a No Accounts message.
     */
    if (this.props.app.currentAccountId === null
          && getAccountIds().length == 0) {
      return <NoAccounts />;
    }

    return (
      <div className="hideable-left">
        <div className="hideable-left__left app-drag filter-controls">
          <NotificationFilters accountId={this.props.app.currentAccountId}
                               notifications={notifications}
                               notificationFilters={filterRules} />
        </div>
        <div className="hideable-left__content no-outline">
          <ViewBar title="Notifications"
                   getRightContent={this.props.app.isPolling
                                    ? () =>
                                      (
                                        <CenteredBox>
                                          <Loader size="small" />
                                        </CenteredBox>
                                      )
                                    : () => !filterRules.read
                                              ? (
                                                  <CenteredBox>
                                                    <a href="#"
                                                      className="link--epsilon-dark-action"
                                                      onClick={this.handleMarkAllNotificationsAsRead.bind(this, filteredNotifications)}>
                                                      <Octicon name="check" />
                                                    </a>
                                                  </CenteredBox>
                                                )
                                              : undefined}>
            {filteredNotifications.length > 0
            ? <NotificationsList accountId={this.props.app.currentAccountId.toString()}
                                 notifications={filteredNotifications}
                                 disableMarkAsRead={!filterRules.read}
                                 onDoubleClick={this.handleNotificationDoubleClick.bind(this)} />
              : <NoNotifications />}
          </ViewBar>
        </div>
      </div>
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