import * as React from 'react';

interface IIconProps
{
  icon: string;

  className?: string;
};

const Icon: React.SFC<IIconProps> = (props) =>
(
  <i className={'ti '
                  + 'ti-' + props.icon
                  + (typeof props.className === 'string'
                        ? ' ' + props.className
                        : '')} />
);

export default Icon;