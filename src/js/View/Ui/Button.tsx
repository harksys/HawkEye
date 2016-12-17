import * as React from 'react';

interface IButtonProps
{
  onClick(): void;

  className?: string;

  children?: any;
};

const Button: React.SFC<IButtonProps> = props =>
(
  <button className={'btn'
                      + (typeof props.className === 'string'
                          ? ' ' + props.className
                          : '')}
          onClick={props.onClick}>
    {props.children}
  </button>
);

export default Button;