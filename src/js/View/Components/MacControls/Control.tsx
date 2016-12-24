import * as React from 'react';

import CloseIcon from './Icons/Close';
import ResizeIcon from './Icons/Resize';
import MinimizeIcon from './Icons/Minimize';

interface IMacControlsControlProps
{
  control: string;
};

class Control extends React.Component<IMacControlsControlProps, any>
{
  render()
  {
    return (
      <div className={'mac-controls__control mac-controls__control--'
                        + this.props.control}>
        {this.props.control === 'close'
          ? <CloseIcon />
          : this.props.control === 'resize'
              ? <ResizeIcon />
              : this.props.control === 'minimize'
                  ? <MinimizeIcon />
                  : undefined}
      </div>
    );
  }
};

export default Control;