import * as React from 'react';
import { connect } from 'react-redux';

import Control from './Control';

interface IMacControlsProps
{
  setup?: IStateSetup;
};

class MacControls extends React.Component<IMacControlsProps, any>
{
  render()
  {
    return (
      <div className="mac-controls">
        <Control control="close"
                 setup={this.props.setup} />
        <Control control="minimize"
                 setup={this.props.setup} />
        <Control control="resize"
                 setup={this.props.setup} />
      </div>
    );
  }
};

export default connect<{}, {}, IMacControlsProps>(
  (state: IState, props) => ({
    setup : state.setup
  })
)(MacControls);