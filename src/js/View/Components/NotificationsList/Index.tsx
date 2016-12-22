import * as React from 'react';

import {
  AutoSizer,
  Collection
} from 'react-virtualized';
import { Notification } from 'View/Ui/Index';

interface INotificationsListProps
{
  notifications: IGitHubNotification[];
};

class NotificationsList extends React.Component<INotificationsListProps, any>
{
  render()
  {
    return (
      <AutoSizer>
        {({ height, width }) => {
          return width === 0
                    ? <div></div>
                    : <Collection key={'notifications' + width + height}
                                  cellCount={this.props.notifications.length}
                                  height={height}
                                  width={width}
                                  cellRenderer={this.renderRow.bind(this, this.props.notifications)}
                                  cellSizeAndPositionGetter={this.cellSizeCalculator.bind(this, width)} />}}
      </AutoSizer>
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

export default NotificationsList;