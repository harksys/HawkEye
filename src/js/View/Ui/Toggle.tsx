import * as React from 'react';

interface IToggleProps
{
  value: any;

  options: IToggleOption[];

  className?: string;

  onChange?(value: any): void;
};

interface IToggleOption
{
  index: number;

  text: string;

  value: any;
};

class Toggle extends React.Component<IToggleProps, any>
{
  handleOptionClick(value, e)
  {
    e.preventDefault();

    this.props.onChange(value);
  }

  render()
  {
    return (
      <div className={'toggle'
                        + (typeof this.props.className === 'string'
                              ? ' ' + this.props.className
                              : '')}>
        {this.props.options
             .sort((a, b) => a.index - b.index)
             .map((option, i, a)=>
             (
               <a key={option.index}
                  href="#"
                  className={'toggle__option'
                              + (i === 0
                                  ? ' toggle__option--first'
                                  : '')
                              + (i + 1=== a.length
                                  ? ' toggle__option--last'
                                  : '')
                              + (option.value === this.props.value
                                  ? ' toggle__option--active'
                                  : '')}
                  onClick={this.handleOptionClick.bind(this, option.value)}>
                {option.text}
               </a>
             ))}
      </div>
    );
  }
};

export default Toggle;