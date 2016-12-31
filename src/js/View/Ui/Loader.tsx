import * as React from 'react';

interface ILoaderProps
{
  size?: string;

  default?: boolean
};

const Loader: React.SFC<ILoaderProps> = props =>
(
  <div className={'loader'
                    + (typeof props.size === 'string'
                        ? ' loader--' + props.size
                        : '')
                    + (props.default
                        ? ' loader--default'
                        : '')}>
    {'Loading'}
  </div>
);

export default Loader;