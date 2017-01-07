import * as React from 'react';

import createMenu from 'Electron/Menus/Repository';

import { Btn } from 'View/Ui/Index';

interface INotificationFilterRepositoryFilterProps
{
  accountId: number;

  repositoryFilters: IGitHubNotificationFilterSetRepository[];

  className?: string;

  getTitle(): string;

  getFilterTitle(filter: IGitHubNotificationFilterSetRepository): string;

  getFilterIsActive(filter: IGitHubNotificationFilterSetRepository): boolean;

  onClick(filter: IGitHubNotificationFilterSetRepository): void;
};

class NotificationFilterRepositoryFilter extends React.Component<INotificationFilterRepositoryFilterProps, any>
{
  handleRightClick(repository: IGitHubRepository, e)
  {
    e.preventDefault();

    try {
      createMenu(this.props.accountId, repository)
        .popup(e.clientX, e.clientY);
    } catch (e) {}
  }

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
                     onClick={this.props.onClick.bind(null, filter)}
                     onContextMenu={this.handleRightClick.bind(this, filter.repository)}>
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