import * as React from 'react';

import { Link } from 'react-router';
import { Icon } from 'View/Ui/Index';

interface IViewBarProps
{
  title: string;

  backLink?: string;
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
            <p className="view-bar__title">
              {this.props.title}
            </p>
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