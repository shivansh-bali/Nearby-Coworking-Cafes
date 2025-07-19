import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapState: 0,
  filterState: 0,
};

export let sliderMiles = 2;
export let filterArray: any[] = [];

const MapSlice: any = createSlice({
  name: "MapSlice",
  initialState,
  reducers: {
    sliderValue(state = initialState, action) {
      sliderMiles = action.payload;
    },
    changeMapState(state = initialState) {
      state.mapState = 0;
    },
    increaseMapState(state = initialState) {
      state.mapState += 1;
    },
    setSearchFilter(state = initialState, action) {
      state.filterState += 1;
      filterArray = action.payload;
    },
  },
});

export const {
  sliderValue,
  changeMapState,
  increaseMapState,
  setSearchFilter,
} = MapSlice.actions;
export default MapSlice.reducer;
