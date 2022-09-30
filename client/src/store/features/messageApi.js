import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../utils/api";

export const messageApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: base_url + "/msg" }),
  reducerPath: "messagePath",
  tagTypes: ["messages"],
  endpoints: (build) => ({
    getMessages: build.query({
      query: (body) => ({
        url: "/getMsg",
        method: "POST",
        body,
      }),
      providesTags: ["messages"],
    }),
    addMessages: build.mutation({
      query: (body) => ({
        url: "/addMsg",
        method: "POST",
        body,
      }),
      invalidatesTags:['messages']
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessagesMutation } = messageApi;
