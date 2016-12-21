import * as React from 'react';
import { connect } from 'react-redux';

import * as concat from 'lodash/concat';

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
      <ViewBar title="Notifications">
        <div className="hideable-left">
          <div className="hideable-left__left bg--lighter-grey">
            <p>{'Filters'}</p>
          </div>
          <div className="hideable-left__content">
            <p>{'Notifications go here'}</p>
            {'L: ' + notifications.length}
          </div>
        </div>
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState, props: IAppIndexProps) => ({
    notifications : state.notifications
  })
)(Index);