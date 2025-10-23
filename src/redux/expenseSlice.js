
// src/redux/expenseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpense: 0,
  categoricalExpense: {
    food: 0,
    travel: 0,
    entertainment: 0,
    others: 0,
  },
};


const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateTotalExpense(state, action) {
      // action.payload = { amount: number, operation: 'add' | 'sub' }
      const { amount, operation } = action.payload;
      if (operation === "add") state.totalExpense += Number(amount);
      else if (operation === "sub") state.totalExpense -= Number(amount);
    },
    updateCategoricalExpense(state, action) {
      // action.payload = { category: 'food', amount: number }
      const { category, amount } = action.payload;
      if (state.categoricalExpense[category] !== undefined) {
        state.categoricalExpense[category] += Number(amount);
      }
    },
    resetAllExpense() {
      return initialState;
    },
    
  },
});

export const {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
