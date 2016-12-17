import * as React from 'react';

import { Anchor } from './Index';

interface IBtnProps
{
  className?: string;

  children?: any;

  onClick?(): void;
};

const Btn: React.SFC<IBtnProps> = props =>
(
  <Anchor className={'btn'
                      + (typeof props.className === 'string'
                           ? ' ' + props.className
                           : '')}
          onClick={props.onClick}>
    {props.children}
  </Anchor>
);

export default Btn;