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
import { statsSlice } from "./statsSlice";

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
  [statsSlice.name]: statsSlice.reducer,
});

// this is a commit to reupdate the branch
const persistConfig = {
  key: "root",
  storage: globalThis.indexedDB
    ? createIdbStorage({ name: "brigidsAnvil", storeName: "brigidStore" })
    : defaultStorage,
  serialize: false, // Data serialization is not required and disabling it allows you to inspect storage value in DevTools; Available since redux-persist@5.4.0
  deserialize: false, // Required to bear same value as `serialize` since redux-persist@6.0
  blacklist: ["authState", "statsState"],
  transforms: [apiTransform],
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
