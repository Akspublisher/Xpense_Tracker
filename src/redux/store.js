
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expenseReducer from "./expenseSlice";
import transactionReducer from "./transactionSlice"; // ✅ singular

const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
    transactions: transactionReducer,
  },
});
export default store;