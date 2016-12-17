import * as React from 'react';

interface ICenteredBoxProps
{
  children?: any;
};

const CenteredBox: React.SFC<ICenteredBoxProps> = props =>
(
  <div className="dialog">
    <div className="dialog__cell">
      {props.children}
    </div>
  </div>
);

export default CenteredBox;