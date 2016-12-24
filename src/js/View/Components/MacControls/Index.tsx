import * as React from 'react';

import Control from './Control';

class MacControls extends React.Component<any, any>
{
  render()
  {
    return (
      <div className="mac-controls">
        <Control control="close" />
        <Control control="minimize" />
        <Control control="resize" />
      </div>
    );
  }
};

export default MacControls;