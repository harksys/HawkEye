import * as React from 'react';
import { connect } from 'react-redux';
import * as concat from 'lodash/concat';

import {
  AutoSizer,
  Collection
} from 'react-virtualized';
import { Notification } from 'View/Ui/Index';
import ViewBar from 'View/Components/ViewBar/Index';

interface IAppIndexProps
{
  notifications: IStateNotifications;
};

class Index extends React.Component<IAppIndexProps, any>
{
  render()
  {
    let notifications: IGitHubNotification[] = [];
    Object.keys(this.props.notifications)
        .forEach(accId =>
        {
          Object.keys(this.props.notifications[accId])
                .forEach(repoId => {
                  Object.keys(this.props.notifications[accId][repoId])
                        .forEach(notificationId => {
                          notifications.push(this.props.notifications[accId][repoId][notificationId]);
                        })
                })
        });

    return (
      <ViewBar title={'Notifications - ' + notifications.length}>
        <div className="hideable-left">
          <div className="hideable-left__left bg--lighter-grey">
            <p>{'Filters'}</p>
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
    notifications : state.notifications
  })
)(Index);