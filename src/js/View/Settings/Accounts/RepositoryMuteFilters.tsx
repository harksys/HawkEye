import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Btn,
  Scroll
} from 'View/Ui/Index';

interface IAccountRepositoryMuteFilterProps extends ReactRouter.RouteComponentProps<{
                                                      accountId: number;
                                                      repoId: string;
                                                    }, any>
{

};

class AccountRepositoryMuteFilter extends React.Component<IAccountRepositoryMuteFilterProps, any>
{
  render()
  {
    return (
      <ViewBar title=""
               backLink={'/settings/accounts/' + this.props.params.accountId}>
        <Scroll>
          {'Mute Filter settings'}
        </Scroll>
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState, props: IAccountRepositoryMuteFilterProps) => ({

  })
)(AccountRepositoryMuteFilter);