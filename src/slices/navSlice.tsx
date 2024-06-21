import { IRootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export interface INavState {
  showFilter: boolean;
}

const initialState: INavState = {
  showFilter: false,
};

export const navSlice: any = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setShowFilter: (state: INavState, action) => {
      state.showFilter = action.payload;
    },
  },
});

export const { setShowFilter } = navSlice.actions;
export const selectShowFilter = (state: IRootState) => state.nav.showFilter;

export default navSlice.reducer;
