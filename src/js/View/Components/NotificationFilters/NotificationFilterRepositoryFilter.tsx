import * as React from 'react';

import { Btn } from 'View/Ui/Index';

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
        <div className="soft-delta soft-zeta--bottom">
          <label>{this.props.getTitle()}</label>
        </div>
        {this.props.repositoryFilters
             .map(filter =>
             (
               <div key={filter.repository.id}
                    className="soft-delta--right push-iota--bottom">
                <Btn className="btn--hard-right btn--pill"
                     onClick={() => {}}>
                  {this.props.getFilterTitle(filter)}
                </Btn>
              </div>
             ))}
      </div>
    );
  }
};

export default NotificationFilterRepositoryFilter;