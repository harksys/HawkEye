import * as React from 'react';

import {
  isLastItem,
  hasMinItems,
  isFirstItem
} from 'Helpers/Lang/Array';

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
    return (
      <div className={this.props.className}>
        {this.props.buttons
             .map((btn, i, a) =>
             {
               let className = (btn.className || '')
                                  + (hasMinItems(a, 1)
                                        && isFirstItem(i)
                                        ? ' btn--hard-bottom'
                                        : '')
                                  + (hasMinItems(a, 1)
                                        && isLastItem(a, i)
                                        ? ' btn--hard-top'
                                        : '')
                                  + (hasMinItems(a, 1)
                                      && !isFirstItem(i)
                                      && !isLastItem(a, i)
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