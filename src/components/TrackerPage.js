
// src/components/TrackerPage.jsx
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import Header from "./Header";
import Insights from "./Insights";
import NewExpenseForm from "./NewExpenseForm";
import ExpensesTable from "./ExpenseTable";
import { useSelector, useDispatch } from "react-redux";
import { updateMonthlyBudget, updateCategoricalBudget } from "../redux/userSlice";

import { resetAllBudget } from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
console.log(resetAllExpense);

export default function TrackerPage() {
  const user = useSelector((s) => s.user);
  const [showUpdate, setShowUpdate] = useState(false);
  const [upd, setUpd] = useState({
    name: user.name,
    total: user.monthlyBudget || "",
    food: user.categoricalBudget.food || "",
    travel: user.categoricalBudget.travel || "",
    entertainment: user.categoricalBudget.entertainment || "",
  });

  const [userName, setUserName] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [categoricalBudget, setCategoricalBudget] = useState("");


  const [confirmReset, setConfirmReset] = useState(false);

  const dispatch = useDispatch();

  const openUpdate = () => setShowUpdate(true);
  const closeUpdate = () => setShowUpdate(false);
  const navigate = useNavigate();

  const handleUpdateChange = (e) => {
    const { id, value } = e.target;
    setUpd((s) => ({ ...s, [id]: value }));
  };

  const handleUpdateSave = (e) => {
    e.preventDefault();
    //const name = String(upd.name);
    const total = Number(upd.total);
    const f = Number(upd.food || 0);
    const tr = Number(upd.travel || 0);
    const en = Number(upd.entertainment || 0);
    const sum = f + tr + en;
    if (sum > total) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }
    const other = total - sum;
     
    dispatch(updateMonthlyBudget(total));
    dispatch(updateCategoricalBudget({
      food: f,
      travel: tr,
      entertainment: en,
      others: other,
    }));
    closeUpdate();
          
    };
    const handleReset = () => {
      const confirmReset = window.confirm("Are you sure you want to reset?");
      if (confirmReset) {
        setTimeout(() => {
          dispatch(resetAllBudget());
          dispatch(removeAllTransactions());
          setUserName("");
          setMonthlyBudget("");
          setCategoricalBudget({
            food: "",
            travel: "",
            entertainment: "",
          });
          setUpd({
            name: "",
            budget: "",
            food: "",
            travel: "",
            entertainment: "",
            other: "",
          });
        }, 200);
      }
      navigate("/");
  };

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <Header onUpdateClick={openUpdate} />

      {showUpdate && (
        <div style={{ position: "fixed", left: 0, top: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", padding: 20, width: 420 }}>
            <h3>Update Budget</h3>
            <form onSubmit={handleUpdateSave}>
              <div>
              <label htmlFor="name">Enter your Name:</label>
          <input id="name" type="string" value={upd.name} onChange={handleUpdateChange} />
          <br />
        </div>

        <div>
          <label htmlFor="budget">Enter your monthly budget:</label>
          <input id="total" type="number" value={upd.total} onChange={handleUpdateChange} />
          <br />
        </div>

        <h3>Fill your monthly Categorical budgets:</h3>

        <table border="1" cellPadding="3" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Food</th>
            <th>Travel</th>
            <th>Entertainment</th>
          </tr>
        </thead>
        <tbody>
              <tr>
              <td><input id="food" type="number" value={upd.food} onChange={handleUpdateChange} /></td>
              <td><input id="travel" type="number" value={upd.travel} onChange={handleUpdateChange} /></td>
              <td><input id="entertainment" type="number" value={upd.entertainment} onChange={handleUpdateChange} /></td>
                </tr>  
            {/* </tr>
          ))} */}
        </tbody>        
        </table>

              <div style={{ marginTop: 12 }}>
                <button type="submit">Update budget</button> 
                <button id="clear" onClick={handleReset}>Start new tracker</button> 
                <button type="button" onClick={closeUpdate} style={{ marginRight: 8 }}>Go Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Insights />
      <NewExpenseForm />
      <ExpensesTable />
    </div>
  );
}
