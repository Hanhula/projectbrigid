import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiResponse, Article } from "../types/article";
import { Identity } from "../types/user";
import { World } from "../types/world";

export type ArticleFetchProgress = {
  worldId: string;
  totalCount: number;
  loadedCount: number;
  offset: number;
  isComplete: boolean;
};

export type AnvilAppState = {
  apiResponse: ApiResponse;
  identity: Identity;
  world: World;
  worlds: { success: boolean; entities: World[] };
  articles: Article[];
  isLoadingArticles: boolean;
  articleFetchProgress: ArticleFetchProgress;
};

const initialArticleFetchProgress: ArticleFetchProgress = {
  worldId: "",
  totalCount: 0,
  loadedCount: 0,
  offset: 0,
  isComplete: false,
};

// Initial state
const initialState = {
  apiResponse: { success: true },
  identity: { success: false },
  world: {},
  worlds: { success: false },
  isLoadingArticles: false,
  articleFetchProgress: initialArticleFetchProgress,
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
    setArticleFetchProgress(state, action) {
      const progress = action.payload as ArticleFetchProgress;
      state.articleFetchProgress = {
        ...state.articleFetchProgress,
        ...progress,
      };
    },
    resetArticleFetchProgress(state) {
      state.articleFetchProgress = initialArticleFetchProgress;
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
  setArticleFetchProgress,
  resetArticleFetchProgress,
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
export const selectArticleFetchProgress = (state: {
  apiState: AnvilAppState;
}) => state.apiState.articleFetchProgress;

export default apiSlice.reducer;
