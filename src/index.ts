import {
  Client,
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

class NotionDbConnector {
  private client: Client;
  constructor(notionToken: string) {
    this.client = new Client({ auth: notionToken });
  }

  public fetchDb = async (
    param: QueryDatabaseParameters
  ): Promise<QueryDatabaseResponse | undefined> => {
    try {
      const result: QueryDatabaseResponse = await this.client.databases.query({
        database_id: param.database_id,
        filter: param.filter,
        sorts: param.sorts,
      });

      return result;
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            // ...
            break;
          case APIErrorCode.ObjectNotFound:
            // ...
            break;
          case APIErrorCode.Unauthorized:
            // ...
            break;
          // ...
          default:
          // you could even take advantage of exhaustiveness checking
        }
      }
    }
  };
}

export { NotionDbConnector };
