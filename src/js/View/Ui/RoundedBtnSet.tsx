import * as React from 'react';

import { Btn } from './Index';

interface IRoundedBtnSetProps
{
  className?: string;

  buttons: IRoundedBtnSetBtn[];
};

interface IRoundedBtnSetBtn
{
  key: string;

  text: string;

  className?: string;

  onClick?();
};

class RoundedBtnSet extends React.Component<IRoundedBtnSetProps, any>
{
  render()
  {
    // @todo: Array helper methods to clean this array logic up
    return (
      <div className={this.props.className}>
        {this.props.buttons
             .map((btn, i, a) =>
             {
               let className = (btn.className || '')
                                  + (a.length > 1
                                        && i === 0
                                        ? ' btn--hard-bottom'
                                        : '')
                                  + (a.length > 1
                                        && i + 1 === a.length
                                        ? ' btn--hard-top'
                                        : '')
                                  + (a.length > 1
                                      && i !== 0
                                      && i + 1 < a.length
                                      ? ' btn--hard'
                                      : '')

               return (
                 <Btn key={btn.key}
                      className={className}
                      onClick={btn.onClick}>
                  {btn.text}
                </Btn>
               );
             })}
      </div>
    );
  }
};

export default RoundedBtnSet;