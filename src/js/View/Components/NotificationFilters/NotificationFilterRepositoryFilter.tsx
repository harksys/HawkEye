import * as React from 'react';

interface INotificationFilterRepositoryFilterProps
{
  repositoryFilters: IGitHubNotificationFilterSetRepository[];

  className?: string;

  getTitle(): string;

  getFilterTitle(filter: IGitHubNotificationFilterSetRepository): string;
};

class NotificationFilterRepositoryFilter extends React.Component<INotificationFilterRepositoryFilterProps, any>
{
  render()
  {
    return (
      <div className={this.props.className}>
        <label>{this.props.getTitle()}</label>
        {this.props.repositoryFilters
             .map(filter =>
             (
               <div key={filter.repository.id}>
                 {this.props.getFilterTitle(filter) + ' ' + filter.count}
               </div>
             ))}
      </div>
    );
  }
};

export default NotificationFilterRepositoryFilter;