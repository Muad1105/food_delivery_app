import { createSlice } from "@reduxjs/toolkit";

interface initialValueState {
  showIngredientAdded: Boolean;
  showCategoryAdded: Boolean;
  showIngredientDeleted: Boolean;
  showCategoryDeleted: Boolean;
}

const initialValue: initialValueState = {
  showIngredientAdded: false,
  showCategoryAdded: false,
  showIngredientDeleted: false,
  showCategoryDeleted: false,
};

const showChangesSlice = createSlice({
  name: "showChangesInstantly",
  initialState: initialValue,
  reducers: {
    setShowIngredientAdded: (state, action) => {
      console.log("ingredient add triggered.");

      state.showIngredientAdded = action.payload;
    },
    setShowIngredientDeleted: (state, action) => {
      state.showIngredientDeleted = action.payload;
    },
    setShowCategoryAdded: (state, action) => {
      state.showCategoryAdded = action.payload;
    },
    setShowCategoryDeleted: (state, action) => {
      console.log("category delete triggered");
      state.showCategoryDeleted = action.payload;
    },
  },
});

export const {
  setShowCategoryAdded,
  setShowCategoryDeleted,
  setShowIngredientAdded,
  setShowIngredientDeleted,
} = showChangesSlice.actions;

export default showChangesSlice.reducer;
