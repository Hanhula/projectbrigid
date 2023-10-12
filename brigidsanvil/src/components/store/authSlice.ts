import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiResponse, Article } from "../types/article";
import { Identity } from "../types/user";
import { World } from "../types/world";

export type AuthState = {
  authToken: string;
};

// Initial state
const initialState = {
  authToken: null,
};

// Actual Slice
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action,
      };
    });
  },
});

export const { setAuthToken } = authSlice.actions;

export const selectAuthToken = (state: { authState: AuthState }) =>
  state.authState.authToken;

export default authSlice.reducer;
