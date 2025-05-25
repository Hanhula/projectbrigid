import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { apiSlice } from "./apiSlice";
import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import defaultStorage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";
import { articleSlice } from "./articlesSlice";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import Cookies from "universal-cookie";
import { enableMapSet } from "immer";
import {
  mapToObject,
  migrateDetailArraysToMaps,
  migrateWorldArraysToMaps,
  articleMapTransform,
} from "./migration-tools";

enableMapSet();

// Used to prevent the loading state from persisting across refreshes.
const apiTransform = createTransform(
  (inboundState, key) => {
    if (typeof inboundState === "object" && inboundState !== null) {
      return { ...inboundState };
    }
    return inboundState;
  },
  (outboundState, key) => {
    if (typeof outboundState === "object" && outboundState !== null) {
      return { ...outboundState, isLoadingArticles: false };
    }
    return outboundState;
  },
  { whitelist: ["apiState"] }
);

const reducers = combineReducers({
  [apiSlice.name]: apiSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [articleSlice.name]: articleSlice.reducer,
});

const APP_VER: number = 1.1;

// this is a commit to reupdate the branch
const persistConfig = {
  key: "root",
  storage: globalThis.indexedDB
    ? createIdbStorage({ name: "brigidsAnvil", storeName: "brigidStore" })
    : defaultStorage,
  serialize: false, // Data serialization is not required and disabling it allows you to inspect storage value in DevTools; Available since redux-persist@5.4.0
  deserialize: false, // Required to bear same value as `serialize` since redux-persist@6.0
  blacklist: ["authState"],
  transforms: [apiTransform, articleMapTransform],
  version: APP_VER, // 1.1 = adding Map() instead of [] for articles
  migration: (state: any, version: number) => {
    if (!state) return state;

    // return Promise.resolve({
    //   ...state,
    //   _persist: {
    //     ...state._persist,
    //     version: APP_VER,
    //   },
    // });

    if (state._persist.version < version) {
      const oldWorldArticleData = state.articleState.worldArticles;
      const oldWorldDetailData = state.articleState.detailState;
      if (
        Array.isArray(oldWorldArticleData) ||
        Array.isArray(oldWorldDetailData)
      ) {
        const articleMap = migrateWorldArraysToMaps(oldWorldArticleData);
        const detailMap = migrateDetailArraysToMaps(oldWorldDetailData);

        return Promise.resolve({
          ...state,
          articleState: {
            ...state.articleState,
            worldArticles: mapToObject(articleMap), // must store as POJO
            detailState: mapToObject(detailMap),
          },
          _persist: {
            ...state._persist,
            version: APP_VER,
          },
        });
      } else {
        console.error("Migration failed, data seems to not match.");
        return Promise.resolve(state);
      }
    } else {
      return Promise.resolve(state);
    }
  },
};

const persistedReducer = persistReducer(persistConfig, reducers);

const cookies = new Cookies();
const initialAuthToken = cookies.get("authToken");

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware],
    devTools: true,
    preloadedState: {
      [authSlice.name]: { authToken: initialAuthToken },
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);

export const persistStoreWrapper = (store: AppStore) => {
  return persistStore(store);
};

export default persistStoreWrapper;
