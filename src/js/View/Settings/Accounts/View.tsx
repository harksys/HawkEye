import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { removeAccount } from 'Actions/UIActions/Accounts';

import ViewBar from 'View/Components/ViewBar/Index';
import { Btn } from 'View/Ui/Index';

interface IViewAccountSettingsProps extends ReactRouter.RouteComponentProps<{
                                              accountId: string;
                                            }, any>
{

};

class ViewAccountSettings extends React.Component<IViewAccountSettingsProps, any>
{
  render()
  {
    return (
      <ViewBar title="Account Settings"
               backLink="/settings">
        <div className="soft-delta">
          <div className="grid">
            <div className="grid__item one-whole">
              <Btn className="btn--error"
                   onClick={() => dispatch(removeAccount(this.props.params.accountId))}>
                Remove Account
              </Btn>
            </div>
          </div>
        </div>
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(ViewAccountSettings);