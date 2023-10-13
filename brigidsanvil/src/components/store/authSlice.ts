import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type AuthState = {
  authToken: string;
};

const initialState = {
  authToken: null,
};

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
