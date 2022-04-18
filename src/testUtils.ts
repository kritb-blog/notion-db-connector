const queryMock = jest.fn();
const pageRetrieveMock = jest.fn();

class MockNotionClient {
  public databases;
  public pages;
  constructor() {
    this.databases = {
      query: queryMock,
    };
    this.pages = {
      retrieve: pageRetrieveMock,
    };
  }
}

export { MockNotionClient, queryMock, pageRetrieveMock };
