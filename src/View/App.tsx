import * as React from 'react';

import { Link } from 'react-router';

class App extends React.Component<any, any>
{
  render()
  {
    return (
      <div>
        {this.props.children || (
          <div>
            <Link to="/settings">
              {'Settings'}
            </Link>
          </div>
        )}
      </div>
    );
  }
};

export default App;