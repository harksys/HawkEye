///<refernce path="../Core/Interfaces/IRequestFactory" />

class GitHub
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }
};

export default GitHub;
