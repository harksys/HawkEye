import * as React from 'react';

interface IScrollProps
{
  className?: string;

  children?: any;
};

const Scroll: React.SFC<IScrollProps> = props =>
(
  <div className={'vscroll'
                    + (typeof props.className === 'string'
                        ? ' ' + props.className
                        : '')}>
    <div className={'vscroll__content'}>
      {props.children}
    </div>
  </div>
);

export default Scroll;