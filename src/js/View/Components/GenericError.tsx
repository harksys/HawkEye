import * as React from 'react';

import {
  BtnTo,
  CenteredBox
} from 'View/Ui/Index';

interface IGenericErrorProps
{
  title: string;

  description: string;

  buttonText: string;

  buttonUrl: string;
};

class GenericError extends React.Component<IGenericErrorProps, any>
{
  render()
  {
    return (
      <CenteredBox>
        <h2 className="generic-error__title push-zeta--bottom">
          {this.props.title}
        </h2>
        <p className="generic-error__description push-delta--bottom">
          {this.props.description}
        </p>
        <BtnTo to={this.props.buttonUrl}
               className="generic-error__btn max-width--200 push-auto--sides">
          {this.props.buttonText}
        </BtnTo>
      </CenteredBox>
    );
  };
};

export default GenericError;