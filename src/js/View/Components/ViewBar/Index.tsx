import * as React from 'react';

import { Link } from 'react-router';
import { Icon } from 'View/Ui/Index';

interface IViewBarProps
{
  title: string;

  backLink?: string;

  getLeftContent?(): any;

  getRightContent?(): any;
};

class ViewBar extends React.Component<IViewBarProps, any>
{
  render()
  {
    return (
      <div className="hard-top hard-top--delta">
        <div className="hard-top__top bg--black">
          <div className="view-bar">
            {typeof this.props.backLink === 'string'
              ? <Link to={this.props.backLink}
                      className="view-bar__back-link">
                  <Icon icon="angle-left" />
                </Link>
              : undefined}
            {typeof this.props.getLeftContent !== 'function'
              ? <div className="view-bar__left-content">
                  {this.props.getLeftContent()}
                </div>
              : undefined}
            <p className="view-bar__title">
              {this.props.title}
            </p>
            {typeof this.props.getRightContent !== 'function'
              ? <div className="view-bar__right-content">
                  {this.props.getRightContent()}
                </div>
              : undefined}
          </div>
        </div>
        <div className="hard-top__content">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default ViewBar;