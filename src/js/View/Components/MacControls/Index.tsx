import * as React from 'react';
import { connect } from 'react-redux';

import { setWindowFullScreened } from 'Actions/Setup';

import {
  closeCurrentWindow,
  minimizeCurrentWindow,
  maximizeCurrentWindow,
  unmaximizeCurrentWindow,
  setCurrentWindowFullScreen,
  getCurrentWindowIsMaximized
} from 'Helpers/System/Electron';
import { dispatch } from 'Helpers/State/Store';

import Control from './Control';

interface IMacControlsProps
{
  setup?: IStateSetup;
};

class MacControls extends React.Component<IMacControlsProps, any>
{
  handleCloseClick()
  {
    closeCurrentWindow();
  }

  handleMinimizeClick()
  {
    if (this.props.setup.windowFullScreened) {
      return;
    }

    minimizeCurrentWindow();
  }

  handleMaximizeClick()
  {
    // If the window is full screened, then un-fullscreen
    if (this.props.setup.windowFullScreened) {
      setCurrentWindowFullScreen(false);
      dispatch(setWindowFullScreened(false));
      return;
    }

    // If the alt key is not down, full screen
    if (!this.props.setup.altKeyDown) {
      setCurrentWindowFullScreen(true);
      dispatch(setWindowFullScreened(true));
      return;
    }

    // Alt key is down, so if we can maximize,
    // do it and stop.
    if (getCurrentWindowIsMaximized()) {
      unmaximizeCurrentWindow();
      return;
    }

    // Alt key is down, and we are maximized,
    // so unmaximize
    maximizeCurrentWindow();
  }

  render()
  {
    return (
      <div className="mac-controls">
        <Control control="close"
                 setup={this.props.setup}
                 onClick={this.handleCloseClick.bind(this)} />
        <Control control="minimize"
                 setup={this.props.setup}
                 onClick={this.handleMinimizeClick.bind(this)} />
        <Control control="resize"
                 setup={this.props.setup}
                 onClick={this.handleMaximizeClick.bind(this)} />
      </div>
    );
  }
};

export default connect<{}, {}, IMacControlsProps>(
  (state: IState, props) => ({
    setup : state.setup
  })
)(MacControls);