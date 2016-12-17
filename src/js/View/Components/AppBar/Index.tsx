import * as React from 'react';

import { Icon } from 'View/Ui/Index';

interface IAppBarProps
{

};

class AppBar extends React.Component<IAppBarProps, any>
{
  render()
  {
    return (
      <div>
        {'App Bar'}
        <Icon icon="world" />
      </div>
    );
  }
};

export default AppBar;
