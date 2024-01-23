import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface displaySectionState {
  showAddCategoryPage: Boolean;
  showAddProductPage: Boolean;
  showAddIncredientsPage: Boolean;
  showAllProductsPage: Boolean;
}

const initialState: displaySectionState = {
  showAddCategoryPage: false,
  showAddIncredientsPage: false,
  showAddProductPage: false,
  showAllProductsPage: true,
};

export const displaySectionSlice = createSlice({
  name: "sisplaySection",
  initialState,
  reducers: {
    setShowAddCategoryPage: (state) => {
      state.showAddCategoryPage = true;
      state.showAddProductPage = false;
      state.showAddIncredientsPage = false;
      state.showAllProductsPage = false;
    },
    setShowAddIncredientsPage: (state) => {
      state.showAddCategoryPage = false;
      state.showAddProductPage = false;
      state.showAddIncredientsPage = true;
      state.showAllProductsPage = false;
    },
    setShowAddCreateProductPage: (state) => {
      state.showAddCategoryPage = false;
      state.showAddProductPage = true;
      state.showAddIncredientsPage = false;
      state.showAllProductsPage = false;
    },
    setShowAllProductPage: (state) => {
      state.showAddCategoryPage = false;
      state.showAddProductPage = false;
      state.showAddIncredientsPage = false;
      state.showAllProductsPage = true;
    },
  },
});

export const {
  setShowAddCategoryPage,
  setShowAddIncredientsPage,
  setShowAddCreateProductPage,
  setShowAllProductPage,
} = displaySectionSlice.actions;

export default displaySectionSlice.reducer;
