import * as React from 'react';

import {
  getNotificationReasonPrettyName,
  getNotificationSubjectPrettyName
} from 'Helpers/Services/GitHub';
import { dispatch } from 'Helpers/State/Store';
import { createGitHubNotificationFilterSet } from 'Helpers/Models/GitHubNotificationFilterSet';

import {
  setReadFilter,
  addReasonFilter,
  removeReasonFilter,
  addRepositoryFilter,
  addSubjectTypeFilter,
  removeRepositoryFilter,
  removeSubjectTypeFilter
} from 'Actions/NotificationFilters';

import NotificationFilterStringFilter from './NotificationFilterStringFilter';
import NotificationFilterRepositoryFilter from './NotificationFilterRepositoryFilter';

import {
  Btn,
  Icon,
  Scroll
} from 'View/Ui/Index';

interface INotificationFiltersProps
{
  accountId: number;

  notifications: IGitHubNotification[];

  notificationFilters: INotificationFilterSet;
};

class NotificationFilters extends React.Component<INotificationFiltersProps, any>
{
  handleReadFilterClick()
  {
    dispatch(setReadFilter(this.props.accountId, this.props.notificationFilters.read
                                                   ? false
                                                   : true));
  }

  handleSubjectFilterClick(filter: IGitHubNotificationFilterSetStringFilter)
  {
    let filters = this.props.notificationFilters.subjectType;
    if (filters.indexOf(filter.name) > -1) {
      dispatch(removeSubjectTypeFilter(this.props.accountId, filter.name));
      return;
    }

    dispatch(addSubjectTypeFilter(this.props.accountId, filter.name));
  }

  handleReasonFilterClick(filter: IGitHubNotificationFilterSetStringFilter)
  {
    let filters = this.props.notificationFilters.reasonType;
    if (filters.indexOf(filter.name) > -1) {
      dispatch(removeReasonFilter(this.props.accountId, filter.name));
      return;
    }

    dispatch(addReasonFilter(this.props.accountId, filter.name));
  }

  handleRepositoryFilterClick(filter: IGitHubNotificationFilterSetRepository)
  {
    let filters = this.props.notificationFilters.repository;
    if (filters.indexOf(filter.repository.id) > -1) {
      dispatch(removeRepositoryFilter(this.props.accountId, filter.repository.id));
      return;
    }

    dispatch(addRepositoryFilter(this.props.accountId, filter.repository.id));
  }

  render()
  {
    let filterSet = createGitHubNotificationFilterSet(this.props.notifications);

    return (
      <Scroll>
        <div className="soft-delta--ends">
          <div className="grid">
            <div className="grid__item one-whole">
              <div className="push-iota--bottom">
                <Btn className={'btn--hard btn--pill btn--pill-has-count'
                                    + (this.props.notificationFilters.read
                                      ? ' btn--active'
                                      : '')}
                    onClick={this.handleReadFilterClick.bind(this)}>
                  {'Read'}
                  <span className="btn--pill__count">{filterSet.read}</span>
                </Btn>
              </div>
            </div>
            {filterSet.subjectTypes.length > 0
              ? <NotificationFilterStringFilter stringFilters={filterSet.subjectTypes}
                                                className="grid__item one-whole"
                                                getTitle={() => 'Subjects'}
                                                getFilterTitle={filter => getNotificationSubjectPrettyName(filter.name)}
                                                onClick={this.handleSubjectFilterClick.bind(this)}
                                                getFilterIsActive={filter => this.props.notificationFilters
                                                                                .subjectType
                                                                                .indexOf(filter.name) > -1} />
              : undefined}
            {filterSet.reasonTypes.length > 0
              ? <NotificationFilterStringFilter stringFilters={filterSet.reasonTypes}
                                                className="grid__item one-whole"
                                                getTitle={() => 'Reasons'}
                                                getFilterTitle={filter => getNotificationReasonPrettyName(filter.name)}
                                                onClick={this.handleReasonFilterClick.bind(this)}
                                                getFilterIsActive={filter => this.props.notificationFilters
                                                                                .reasonType
                                                                                .indexOf(filter.name) > -1} />
              : undefined}
            {filterSet.repositories.length > 0
              ? <NotificationFilterRepositoryFilter repositoryFilters={filterSet.repositories}
                                                    className="grid__item one-whole"
                                                    getTitle={() => 'Repositories'}
                                                    getFilterTitle={filter => filter.repository.fullName.toLowerCase()}
                                                    onClick={this.handleRepositoryFilterClick.bind(this)}
                                                    getFilterIsActive={filter => this.props.notificationFilters
                                                                                    .repository
                                                                                    .indexOf(filter.repository.id) > -1} />
              : undefined}
          </div>
        </div>
      </Scroll>
    );
  }
};

export default NotificationFilters;