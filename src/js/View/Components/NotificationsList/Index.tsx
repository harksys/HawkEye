import * as React from 'react';

import {
  AutoSizer,
  Collection
} from 'react-virtualized';
import { Notification } from 'View/Ui/Index';

interface INotificationsListProps
{
  accountId: string;

  notifications: IGitHubNotification[];

  disableMarkAsRead?: boolean;

  onClick?(notification: IGitHubNotification);

  onDoubleClick?(notification: IGitHubNotification);
};

class NotificationsList extends React.Component<INotificationsListProps, any>
{
  static defaultProps = {
    onClick       : () => {},
    onDoubleClick : () => {},
  };

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
      height : 100,
      x      : 0,
      y      : o.index * 100
    };
  };

  renderRow(notifications: IGitHubNotification[], o: any)
  {
    return (
      <div key={o.key}
           style={o.style}>
        <Notification accountId={this.props.accountId}
                      notification={notifications[o.index]}
                      disableMarkAsRead={this.props.disableMarkAsRead}
                      onClick={this.props.onClick}
                      onDoubleClick={this.props.onDoubleClick} />
      </div>
    );
  };
};

export default NotificationsList;