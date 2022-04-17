import { MockNotionClient, pageRetrieveMock, queryMock } from './testUtils';

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

  describe('fetchDb', () => {
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

  describe('fetchPage', () => {
    it('should call fetch correctly', async () => {
      const connector = new NotionDbConnector('');
      await connector.fetchPage({ page_id: '1234' });
      expect(pageRetrieveMock).toHaveBeenNthCalledWith(1, {
        page_id: '1234',
      });
    });
  });
});
