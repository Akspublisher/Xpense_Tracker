/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTransactionEntry } from "../redux/transactionSlice";
import { updateTotalExpense, updateCategoricalExpense } from "../redux/expenseSlice";


export default function ExpensesTable() {
  const dispatch = useDispatch();
  const transactions = useSelector((s) => s.transactions.transactionList);
  
const [filter, setFilter] = useState("all");

    
  const filtered = filter === "all" ? transactions : transactions.filter((t) => t.category === filter);

  const handleDelete = (id) => {
    const txn = transactions.find((t) => t.id === id);
    if (!txn) return;
    if (confirm("Delete this expense?")) {
      dispatch(removeTransactionEntry(id));
      // subtract from totals
      dispatch(updateTotalExpense({ amount: txn.amount, operation: "sub" }));
      dispatch(updateCategoricalExpense({ category: txn.category, amount: -Number(txn.amount) }));
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
       <hr /><br/>
      {/* <div style={{ marginBottom: 8 }}> */}
        <h3>Filters:  </h3>
        <button onClick={() => setFilter("all")} style={{ marginRight: 6 }}>All</button>
        <button onClick={() => setFilter("food")} style={{ marginRight: 6 }}>Food</button>
        <button onClick={() => setFilter("travel")} style={{ marginRight: 6 }}>Travel</button>
        <button onClick={() => setFilter("entertainment")} style={{ marginRight: 6 }}>Entertainment</button>
        <button onClick={() => setFilter("others")}>Others</button>
      {/* </div> */}
      <br />
      <hr /><br/>
      <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No expenses</td></tr>
          )}
          {filtered.map((t, idx) => (
            <tr key={t.id}>
              <td>{idx + 1}</td>
              <td>{t.name}</td>
              <td>{t.category}</td>
              <td>₹{Number(t.amount).toFixed(2)}</td>
              <td><button onClick={() => handleDelete(t.id)} title="delete">delete 🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
