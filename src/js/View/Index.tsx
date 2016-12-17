import * as React from 'react';

import ViewBar from 'View/Components/ViewBar/Index';

class Index extends React.Component<any, any>
{
  render()
  {
    return (
      <ViewBar title="Notifications">
        <div className="hideable-left">
          <div className="hideable-left__left bg--lighter-grey">
            <p>{'Filters'}</p>
          </div>
          <div className="hideable-left__content">
            <p>{'Notifications go here'}</p>
          </div>
        </div>
      </ViewBar>
    );
  }
};

export default Index;