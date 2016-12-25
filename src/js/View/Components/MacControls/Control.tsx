import * as React from 'react';

import CloseIcon from './Icons/Close';
import ResizeIcon from './Icons/Resize';
import MinimizeIcon from './Icons/Minimize';

interface IMacControlsControlProps
{
  control: string;

  setup: IStateSetup;

  onClick(): void;
};

class Control extends React.Component<IMacControlsControlProps, any>
{
  handleControlClick(e)
  {
    e.preventDefault();

    this.props.onClick();
  }

  render()
  {
    return (
      <a href="#"
         onClick={this.handleControlClick.bind(this)}
         className={'mac-controls__control mac-controls__control--'
                        + this.props.control
                        + (this.props.control === 'minimize'
                             && this.props.setup.windowFullScreened
                             ? ' mac-controls__control--disabled'
                             : '')}>
        {this.props.control === 'close'
          ? <CloseIcon />
          : this.props.control === 'resize'
              ? <ResizeIcon setup={this.props.setup} />
              : this.props.control === 'minimize'
                  ? <MinimizeIcon />
                  : undefined}
      </a>
    );
  }
};

export default Control;