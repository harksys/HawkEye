import * as React from 'react';

import { Btn } from 'View/Ui/Index';

interface INotificationFilterRepositoryFilterProps
{
  repositoryFilters: IGitHubNotificationFilterSetRepository[];

  className?: string;

  getTitle(): string;

  getFilterTitle(filter: IGitHubNotificationFilterSetRepository): string;

  getFilterIsActive(filter: IGitHubNotificationFilterSetRepository): boolean;

  onClick(filter: IGitHubNotificationFilterSetRepository): void;
};

class NotificationFilterRepositoryFilter extends React.Component<INotificationFilterRepositoryFilterProps, any>
{
  render()
  {
    return (
      <div className={this.props.className}>
        <div className="soft-delta soft-zeta--bottom">
          <label className="text--zeta">{this.props.getTitle()}</label>
        </div>
        {this.props.repositoryFilters
             .map(filter =>
             (
               <div key={filter.repository.id}
                    className="push-iota--bottom">
                <Btn className={'btn--hard btn--pill btn--pill-has-count'
                                  + (this.props.getFilterIsActive(filter)
                                       ? ' btn--active'
                                       : '')}
                     onClick={this.props.onClick.bind(null, filter)}>
                  {this.props.getFilterTitle(filter)}
                  <span className="btn--pill__count">{filter.count}</span>
                </Btn>
              </div>
             ))}
      </div>
    );
  }
};

export default NotificationFilterRepositoryFilter;