import * as React from 'react';

interface IAppLoadingProps
{

};

const AppLoading: React.SFC<IAppLoadingProps> = props =>
(
  <div className="app__loading">
    {'Loading'}
  </div>
);

export default AppLoading;