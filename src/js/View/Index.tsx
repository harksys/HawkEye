import * as React from 'react';
import { connect } from 'react-redux';
import * as concat from 'lodash/concat';
import * as values from 'lodash/values';

import { defaultNotificationFilterSet } from 'Constants/Models/NotificationFilterSet';
import Filter from 'Filter/Filter';
import { Read } from 'Filter/FilterFunctions/GitHubNotifications/Index';

import {
  AutoSizer,
  Collection
} from 'react-virtualized';
import { Notification } from 'View/Ui/Index';
import ViewBar from 'View/Components/ViewBar/Index';
import NotificationFilters from 'View/Components/NotificationFilters/Index';

interface IAppIndexProps
{
  app: IStateApp;

  notifications: IStateNotifications;

  notificationFilters: IStateNotificationFilters;
};

class Index extends React.Component<IAppIndexProps, any>
{
  render()
  {
    let notifications = values(this.props.notifications[this.props.app.currentAccountId] || {});
    let filterRules   = (this.props.notificationFilters[this.props.app.currentAccountId]
                            || defaultNotificationFilterSet);

    let filteredN = new Filter<IGitHubNotification>(notifications, filterRules)
                          .addFilterFunction(Read)
                          .filter();

    return (
      <ViewBar title={'Notifications - ' + filteredN.length}>
        <div className="hideable-left">
          <div className="hideable-left__left bg--lighter-grey">
            <NotificationFilters accountId={this.props.app.currentAccountId}
                                 notifications={notifications}
                                 notificationFilters={filterRules} />
          </div>
          <div className="hideable-left__content no-outline">
            <AutoSizer>
              {({ height, width }) => {
                return width === 0
                         ? <div></div>
                         : <Collection key={'notifications' + width + height}
                                       cellCount={notifications.length}
                                       height={height}
                                       width={width}
                                       cellRenderer={this.renderRow.bind(this, notifications)}
                                       cellSizeAndPositionGetter={this.cellSizeCalculator.bind(this, width)} />}}
            </AutoSizer>
          </div>
        </div>
      </ViewBar>
    );
  }

  cellSizeCalculator(width: number, o: any)
  {
    return {
      width  : width,
      height : 90,
      x      : 0,
      y      : o.index * 90
    };
  };

  renderRow(notifications: IGitHubNotification[], o: any)
  {
    return (
      <div key={o.key}
           style={o.style}>
        <Notification notification={notifications[o.index]} />
      </div>
    );
  };
};

export default connect(
  (state: IState, props: IAppIndexProps) => ({
    app                 : state.app,
    notifications       : state.notifications,
    notificationFilters : state.notificationFilters
  })
)(Index);