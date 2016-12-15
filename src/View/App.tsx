import * as React from 'react';

import { Link } from 'react-router';

class App extends React.Component<any, any>
{
  render()
  {
    return (
      <div>
       <Link to="/settings">
         {'View Settings'}
       </Link>
        {this.props.children}
      </div>
    );
  }
};

export default App;