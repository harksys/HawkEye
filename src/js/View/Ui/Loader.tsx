import * as React from 'react';

interface ILoaderProps
{
  size?: string;
};

const Loader: React.SFC<ILoaderProps> = ({ size }) =>
(
  <div className={'loader'
                    + (typeof size === 'string'
                        ? ' loader--' + size
                        : '')}>
    {'Loading'}
  </div>
);

export default Loader;