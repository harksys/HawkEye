import * as React from 'react';

import { dispatch } from 'Helpers/State/Store';
import { clearFilters } from 'Actions/NotificationFilters';

import {
  Btn,
  CenteredBox
} from 'View/Ui/Index';

interface INoNotificationsProps
{
  accountId: number;
};

class NoNotifications extends React.Component<INoNotificationsProps, any>
{
  handleClearFiltersClick()
  {
    dispatch(clearFilters(this.props.accountId));
  }

  render()
  {
    return (
      <CenteredBox>
        <h2 className="push-zeta--bottom no-notifications__title">
          {'Quiver Zero!'}
        </h2>
        <p className="no-notifications__text push-delta--bottom">
          {'Hah, get it? But well done!'}
        </p>
        <Btn className="no-notifications__btn max-width--200 push-auto--sides"
             onClick={this.handleClearFiltersClick.bind(this)}>
          {'Clear Filters'}
        </Btn>
      </CenteredBox>
    );
  }
};

export default NoNotifications;