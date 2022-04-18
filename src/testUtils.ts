const queryMock = jest.fn();
const pageRetrieveMock = jest.fn();
const blockRetrieveMock = jest.fn();
const blockChildrenListMock = jest.fn();

class MockNotionClient {
  public databases;
  public pages;
  public blocks;
  constructor() {
    this.databases = {
      query: queryMock,
    };
    this.pages = {
      retrieve: pageRetrieveMock,
    };
    this.blocks = {
      retrieve: blockRetrieveMock,
      children: {
        list: blockChildrenListMock,
      },
    };
  }
}

export {
  MockNotionClient,
  queryMock,
  pageRetrieveMock,
  blockRetrieveMock,
  blockChildrenListMock,
};
