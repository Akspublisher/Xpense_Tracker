// src/components/Header.jsx
/* eslint-disable no-restricted-globals */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAllBudget } from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
console.log(useDispatch, useNavigate);
export default function Header({ onUpdateClick }) {
  const userName = useSelector((s) => s.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 console.log(resetAllBudget,removeAllTransactions,resetAllExpense,dispatch,navigate);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>{userName ? `${userName}'s Tracker` : "Tracker"}</h2>
      <div>
        <button id="new-update" onClick={onUpdateClick} style={{ marginRight: 8 }}>
          New/Update Tracker
        </button>
      </div>
    </div>
  );
}
