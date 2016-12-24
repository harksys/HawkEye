import * as React from 'react';

interface ICenteredBoxProps
{
  children?: any;

  childClassName?: string;
};

const CenteredBox: React.SFC<ICenteredBoxProps> = props =>
(
  <div className="dialog">
    <div className={'dialog__cell'
                      + (typeof props.childClassName === 'string'
                           ? ' ' + props.childClassName
                           : '')}>
      {props.children}
    </div>
  </div>
);

export default CenteredBox;