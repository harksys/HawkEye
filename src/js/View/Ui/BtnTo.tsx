import * as React from 'react';
import { Link } from 'react-router';

interface IBtnToProps
{
  to: string;

  className?: string;

  children?: any;
};

const BtnTo: React.SFC<IBtnToProps> = props =>
(
  <Link to={props.to}
        className={'btn'
                      + (typeof props.className === 'string'
                           ? ' ' + props.className
                           : '')}>
    {props.children}
  </Link>
);

export default BtnTo;