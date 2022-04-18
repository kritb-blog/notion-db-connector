import {
  Client,
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetPageParameters,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';

class NotionDbConnector {
  private client: Client;
  constructor(notionToken: string) {
    this.client = new Client({ auth: notionToken });
  }

  public fetchPage = async (
    params: GetPageParameters
  ): Promise<GetPageResponse | undefined> => {
    try {
      const result: GetPageResponse = await this.client.pages.retrieve({
        page_id: params.page_id,
      });

      return result;
    } catch (error: unknown) {
      this.logError(error);
    }
  };

  public fetchDb = async (
    params: QueryDatabaseParameters
  ): Promise<QueryDatabaseResponse | undefined> => {
    try {
      const result: QueryDatabaseResponse = await this.client.databases.query({
        database_id: params.database_id,
        filter: params.filter,
        sorts: params.sorts,
      });

      return result;
    } catch (error: unknown) {
      this.logError(error);
    }
  };

  private logError = (error: unknown) => {
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
  };
}

export { NotionDbConnector };
