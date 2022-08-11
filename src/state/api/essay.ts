import { IApiResponse } from './types';
import { api } from './foundation';

type SummaryKey = 'auctions' | 'artworks' | 'shops';
type SummaryValue = {all: number};

const statsApi = api
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchSummaryStats: builder.query<IApiResponse<Record<SummaryKey, SummaryValue>>, void>({
        query: () => '/stats/summary',
      }),
    }),
  });

export { statsApi };

export const {
  useFetchSummaryStatsQuery,
} = statsApi;
