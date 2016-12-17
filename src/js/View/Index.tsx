import * as React from 'react';

import ViewBar from 'View/Components/ViewBar/Index';

class Index extends React.Component<any, any>
{
  render()
  {
    return (
      <ViewBar title="Notifications">
        <p>{'Notifications go here'}</p>
      </ViewBar>
    );
  }
};

export default Index;