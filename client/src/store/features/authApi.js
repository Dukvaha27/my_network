import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../utils/api";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  reducerPath: "authPath",
  tagTypes: ["auth"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    getUsers: build.query({
      query: (token) => ({
        method: "GET",
        headers: {
          authorization:token.accessToken
        },
        url: "/users",
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetUsersQuery } =
  authApi;

export const login = createAsyncThunk(
  "token/add",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {

      const res = await fetch(`${base_url}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const slice = createSlice({
  name: "token",
  initialState: {
    token: JSON.parse(localStorage.getItem('user')),
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
    });
  },
});

const tokenSelector = (state) => state.token;

export const tokenSlct = createSelector(tokenSelector, (state) => state.token);

export default slice.reducer;
