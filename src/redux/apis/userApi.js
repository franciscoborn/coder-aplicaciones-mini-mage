import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    putProfilePicture: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: "PUT",
        body: {
          image: image
        }
      }),
    }),
    getProfilePicture: builder.query({
      query: (localId) => `profilePictures/${localId}.json`
    }),
    updateUserInformation: builder.mutation({
      query: ({ userId, items }) => ({
        url: `/user-info/${userId}`,
        method: 'POST',
        body: { items },
      }),
    }),
    getUserInformation: builder.query({
      query: (userId) => `/user-info/${userId}.json`
    }),
  }),
});


export const { usePutProfilePictureMutation, useGetProfilePictureQuery, useUpdateUserInformationMutation, useGetUserInformationQuery } = userApi;