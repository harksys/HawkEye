import * as React from 'react';

import {
  Loader,
  CenteredBox
} from 'View/Ui/Index';

interface IAppLoadingProps
{
  show: boolean;
};

const AppLoading: React.SFC<IAppLoadingProps> = ({ show }) =>
(
  <div className={'app__loading'
                    + (show
                        ? ' app__loading--show'
                        : '')}>
    <CenteredBox>
      <Loader size="medium"
              default />
    </CenteredBox>
  </div>
);

export default AppLoading;