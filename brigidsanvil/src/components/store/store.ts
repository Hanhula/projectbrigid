import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { apiSlice } from "./apiSlice";
import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";

const reducers = combineReducers({
  [apiSlice.name]: apiSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["authState"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware],
    devTools: true,
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
