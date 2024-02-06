import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiResponse, Article } from "../types/article";
import { Identity } from "../types/user";
import { World } from "../types/world";

export type AnvilAppState = {
  apiResponse: ApiResponse;
  identity: Identity;
  world: World;
  worlds: { success: boolean; entities: World[] };
  articles: Article[];
  isLoadingArticles: boolean;
  isLoadingCategories: boolean;
};

// Initial state
const initialState = {
  apiResponse: { success: true },
  identity: { success: false },
  world: {},
  worlds: { success: false },
  isLoadingArticles: false,
  isLoadingCategories: false,
};

// Actual Slice
export const apiSlice = createSlice({
  name: "apiState",
  initialState,
  reducers: {
    setAPIState(state, action) {
      state.apiResponse = action.payload;
    },
    setIdentity(state, action) {
      state.identity = action.payload;
    },
    setWorld(state, action) {
      state.world = action.payload;
    },
    setWorlds(state, action) {
      state.worlds = action.payload;
    },
    setLoadingArticles(state, action) {
      state.isLoadingArticles = action.payload;
    },
    setLoadingCategories(state, action) {
      state.isLoadingCategories = action.payload;
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

export const {
  setAPIState,
  setIdentity,
  setWorld,
  setWorlds,
  setLoadingArticles,
  setLoadingCategories,
} = apiSlice.actions;

export const selectAPIResponse = (state: { apiState: AnvilAppState }) =>
  state.apiState.apiResponse;
export const selectIdentity = (state: { apiState: AnvilAppState }) =>
  state.apiState.identity;
export const selectWorld = (state: { apiState: AnvilAppState }) =>
  state.apiState.world;
export const selectWorlds = (state: { apiState: AnvilAppState }) =>
  state.apiState.worlds;
export const selectIsLoadingArticles = (state: { apiState: AnvilAppState }) =>
  state.apiState.isLoadingArticles;
export const selectIsLoadingCategories = (state: { apiState: AnvilAppState }) =>
  state.apiState.isLoadingCategories;

export default apiSlice.reducer;
