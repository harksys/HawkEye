import * as React from 'react';

interface IViewBarProps
{
  title: string;
};

class ViewBar extends React.Component<IViewBarProps, any>
{
  render()
  {
    return (
      <div className="hard-top hard-top--delta">
        <div className="hard-top__top bg--light-grey">
          <p>{this.props.title}</p>
        </div>
        <div className="hard-top__content">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default ViewBar;