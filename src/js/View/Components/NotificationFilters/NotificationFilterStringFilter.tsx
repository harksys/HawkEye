import * as React from 'react';

interface INotificationFilterStringFilterProps
{
  stringFilters: IGitHubNotificationFilterSetStringFilter[];

  className?: string;

  getTitle(): string;

  getFilterTitle(filter: IGitHubNotificationFilterSetStringFilter): string;
};

class NotificationFilterStringFilter extends React.Component<INotificationFilterStringFilterProps, any>
{
  render()
  {
    return (
      <div className={this.props.className}>
        <label className="">{this.props.getTitle()}</label>
        {this.props.stringFilters
             .map(filter =>
             (
               <div key={filter.name}>
                 {this.props.getFilterTitle(filter) + ' - ' + filter.count}
               </div>
             ))}
      </div>
    )
  }
};

export default NotificationFilterStringFilter;