import * as React from 'react';

import { dispatch } from 'Helpers/State/Store';
import { closeAppAlert } from 'Actions/AppAlerts';
import { handleAppAlertActionClick } from 'Actions/UIActions/AppAlerts';

import * as Octicon from 'react-octicon';

interface IAppAlertProps
{
  appAlert: IAppAlert;
};

class AppAlert extends React.Component<IAppAlertProps, any>
{
  handleCloseClick(e)
  {
    e.preventDefault();

    dispatch(closeAppAlert(this.props.appAlert.id));
  }

  handleActionClick(e)
  {
    dispatch(handleAppAlertActionClick(this.props.appAlert.stickyActionName,
                                       this.props.appAlert.stickyActionParams));
  }

  render()
  {
    return (
      <div className={'app-alert '
                        + 'app-alert--' + this.props.appAlert.status.toLowerCase()
                        + (this.props.appAlert.show
                              ? ' app-alert--show'
                              : '')}>
        <div className="app-alert__inner">
          {!this.props.appAlert.sticky
            ? (
                <div className="app-alert-pad">
                  <p className="truncate">
                    {this.props.appAlert.message}
                  </p>
                </div>
              )
            : (
                <div className="hard-right hard-right--gamma">
                  <div className="hard-right__content">
                    <div className="app-alert-pad">
                      <p className="truncate">
                        {this.props.appAlert.message}
                      </p>
                    </div>
                  </div>
                  <div className="hard-right__right">
                    {this.props.appAlert.stickyActionIcon !== null
                      ? (
                          <a className="app-alert__inner__action"
                             href="#"
                             onClick={this.handleActionClick.bind(this)}>
                            <Octicon name="sync" />
                          </a>
                        )
                      : (
                          <a className="app-alert__inner__action display--hidden"
                             href="#">
                            <Octicon name={this.props.appAlert.stickyActionIcon} />
                          </a>
                        )}
                    <a className="app-alert__inner__action app-alert__inner__action--last"
                       href="#"
                       onClick={this.handleCloseClick.bind(this)}>
                      <Octicon name="x" />
                    </a>
                  </div>
                </div>
              )}
        </div>
      </div>
    );
  }
};

export default AppAlert;