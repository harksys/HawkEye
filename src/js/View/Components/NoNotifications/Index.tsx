import * as React from 'react';

import { CenteredBox } from 'View/Ui/Index';

interface INoNotificationsProps
{

};

class NoNotifications extends React.Component<INoNotificationsProps, any>
{
  render()
  {
    return (
      <CenteredBox>
        <h2 className="push-zeta--bottom">Quiver Zero!</h2>
        <p>{'Hah, get it? But well done!'}</p>
      </CenteredBox>
    );
  }
};

export default NoNotifications;