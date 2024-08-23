import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type StatsState = {
  field: string;
  value: string;
};

const initialState = {
  field: "",
  value: "",
};

// Create async thunk action
export const setStatsSearchAsync = createAsyncThunk(
  "stats/setStatsSearch",
  async (payload: StatsState, { dispatch }) => {
    dispatch(setStatsSearch(payload));
  }
);

export const statsSlice = createSlice({
  name: "statsState",
  initialState,
  reducers: {
    setStatsSearch(state, action) {
      console.log("hey");
      state.field = action.payload.field;
      state.value = action.payload.value;
      console.log("hey state change", state);
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

export const { setStatsSearch } = statsSlice.actions;

export const selectStatsSearch = (state: { statsState: StatsState }) =>
  state.statsState;

export default statsSlice.reducer;
