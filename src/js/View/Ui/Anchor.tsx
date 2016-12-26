import * as React from 'react';

interface IAnchorProps
{
  className?: string;

  href?: string;

  preventDefault?: boolean;

  onClick?(): void;

  onContextMenu?(): void;
};

class Anchor extends React.Component<IAnchorProps, any>
{
  static defaultProps = {
    href           : '#',
    preventDefault : true,
    onClick        : () => {},
    onContextMenu  : () => {}
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
         onClick={this.handleClick.bind(this)}
         onContextMenu={this.props.onContextMenu}>
        {this.props.children}
      </a>
    );
  }
};

export default Anchor;