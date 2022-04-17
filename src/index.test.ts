const queryMock = jest.fn();
class MockNotionClient {
  public databases;
  constructor() {
    this.databases = {
      query: queryMock,
    };
  }
}

jest.mock('@notionhq/client', () => {
  return {
    Client: MockNotionClient,
  };
});

import { NotionDbConnector } from '.';

describe('NotionDbConnector', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should call fetch correctly', async () => {
    const connector = new NotionDbConnector('');
    await connector.fetchDb({ database_id: '1234' });
    expect(queryMock).toHaveBeenNthCalledWith(1, {
      database_id: '1234',
      filter: undefined,
      sorts: undefined,
    });
  });

  it('should call fetch with filter correctly', async () => {
    const connector = new NotionDbConnector('');
    await connector.fetchDb({
      database_id: '1234',
      filter: { property: 'status', select: { equals: 'in progress' } },
    });
    expect(queryMock).toHaveBeenNthCalledWith(1, {
      database_id: '1234',
      filter: { property: 'status', select: { equals: 'in progress' } },
      sorts: undefined,
    });
  });
});
