import * as React from 'react';

interface IAnchorProps
{
  className?: string;

  href?: string;

  preventDefault?: boolean;

  onClick?(): void;
};

class Anchor extends React.Component<IAnchorProps, any>
{
  static defaultProps = {
    href           : '#',
    preventDefault : true,
    onClick        : () => {}
  };

  handleClick(e)
  {
    if (this.props.preventDefault) {
      e.preventDefault();
    }

    this.props.onClick();
  }

  render()
  {
    return (
      <a href={this.props.href}
         className={this.props.className}
         onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </a>
    );
  }
};

export default Anchor;