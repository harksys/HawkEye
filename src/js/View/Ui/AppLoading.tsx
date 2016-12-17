import * as React from 'react';

interface IAppLoadingProps
{
  show: boolean;
};

const AppLoading: React.SFC<IAppLoadingProps> = ({ show }) =>
(
  <div className="app__loading">
    {'Loading'}
  </div>
);

export default AppLoading;