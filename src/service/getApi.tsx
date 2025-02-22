import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'https://api.artic.edu/api/v1/artworks';

export const artworksApi = createApi({
  reducerPath: 'artworksApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAllArtworks: builder.query({
      query: (page: number) => ({
        url: '/',
        params: {
          fields: 'id,title,artist_title,image_id',
          page,
        },
      }),
    }),
    searchArtworks: builder.query({
      query: ({ query, page }: { query: string; page: number }) => ({
        url: '/search',
        params: {
          fields: 'id,title,artist_title,image_id',
          q: query,
          page,
        },
      }),
    }),
    getArtworkDetails: builder.query({
      query: (id: number) => ({
        url: `/${id}`,
        params: {
          fields:
            'id,title,artist_title,image_id,date_display,artwork_type_title,artist_display',
        },
      }),
    }),
  }),
});

export const {
  useGetAllArtworksQuery,
  useSearchArtworksQuery,
  useGetArtworkDetailsQuery,
} = artworksApi;
