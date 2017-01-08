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
import {
  muteFilterNotifications,
  filterNotificationsByFilteringSet
} from 'Helpers/Models/GitHubNotification';

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

  repositoryMuteFilters: IStateRepositoryMuteFiltersAccount;
};

class Index extends React.Component<IAppIndexProps, any>
{
  constructor(props)
  {
    super(props);

    this.handleFilterNotifications = throttle(this.handleFilterNotifications, 250);
  }

  muteFilterNotifications(notifications: IGitHubNotification[], muteFilters: IStateRepositoryMuteFiltersAccount)
  {
    return muteFilterNotifications(notifications, muteFilters);
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

  getAccountsNotificationFilters()
  {
    return this.props.notificationFilters[this.props.app.currentAccountId] || defaultNotificationFilterSet;
  }

  render()
  {
    /*
     * Get the accounts notifications,
     * and run them through the mute filters
     */
    let notifications             = values(this.props.notifications[this.props.app.currentAccountId] || {});
    let muteFilteredNotifications = this.muteFilterNotifications(notifications,
                                                                 this.props.repositoryMuteFilters);

    /*
     * Get the UIs filter rules, and
     * filter the notifications for the view.
     */
    let filterRules           = this.getAccountsNotificationFilters();
    let filteredNotifications = this.handleFilterNotifications(muteFilteredNotifications, filterRules)
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
        <div className="hideable-left__left filter-controls">
          <NotificationFilters accountId={this.props.app.currentAccountId}
                               notifications={muteFilteredNotifications}
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
                                                      className="notification-check"
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
              : <NoNotifications accountId={this.props.app.currentAccountId} />}
          </ViewBar>
        </div>
      </div>
    );
  }
};

export default connect(
  (state: IState, props: IAppIndexProps) => {
    let app = state.app;

    return {
      app                 : app,
      notifications       : state.notifications,
      notificationFilters : state.notificationFilters,
      repositoryMuteFilters : state.repositoryMuteFilters[app.currentAccountId] || {}
    };
  }
)(Index);