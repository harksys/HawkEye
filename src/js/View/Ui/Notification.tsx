import * as React from 'react';
import * as Octicon from 'react-octicon';

import { relativeTime } from 'Helpers/Lang/Date';
import { getNotificationSubjectIcon } from 'Helpers/Services/GitHub';

import { Icon, CenteredBox } from 'View/Ui/Index';

interface INotificationProps
{
  notification: IGitHubNotification;
};

class Notification extends React.Component<INotificationProps, any>
{
  render()
  {
    return (
      <div className="notification">
        <div className="hard-left hard-left--epsilon">
          <div className="hard-left__left">
            <div className="text--center push-zeta--top">
              <Octicon name={getNotificationSubjectIcon(this.props.notification)}
                       className="position--relative top--nu" />
            </div>
          </div>
          <div className="hard-left__content">
            <div className="soft-zeta--ends soft-delta--right">
              <p className="notification__text">
                {this.props.notification.subject.title}
              </p>
              <p className="text--zeta">
                {this.props.notification.repository.fullName + ' - Updated ' + relativeTime(this.props.notification.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Notification;