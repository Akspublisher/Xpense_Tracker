/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionEntry } from "../redux/transactionSlice";
import { updateTotalExpense, updateCategoricalExpense } from "../redux/expenseSlice";

export default function NewExpenseForm() {
  const dispatch = useDispatch();
  const budgets = useSelector((s) => s.user.categoricalBudget);
  const expenses = useSelector((s) => s.transactions.transactionList);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const currentSpent = (cat) =>
    expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + Number(e.amount), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !category) {
    alert("Please fill all fields before submitting.");
    return;
    }
    if (!name.trim() || amount === "") {
      alert("Please fill expense name and amount.");
      return;
    }
    const amt = Number(amount);
    if (amt <= 0) {
      alert("Amount must be > 0");
      return;
    }

    const allocated = Number(budgets[category] || 0);
    const spent = currentSpent(category);
    if (spent + amt > allocated) {
      const ok = confirm(`This expense exceeds the ${category} budget. Add anyway?`);
      if (!ok) return;
    }
// ✅ Confirmation before adding
const confirmAdd = window.confirm("Do you want to add new expense?");
if (!confirmAdd) return;

    const id = Date.now().toString();
    dispatch(addTransactionEntry({ id, name: name.trim(), category, amount: amt }));
    dispatch(updateTotalExpense({ amount: amt, operation: "add" }));
    dispatch(updateCategoricalExpense({ category, amount: amt }));

    setName("");
    setAmount("");
    setCategory("");

    // ✅ Show success message
    setSuccessMessage("✅ Expense added successfully");

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    
    <div style={{ marginTop: 20 }}>
       <hr /><br/>
      <form id="expense-form1" className="expense-form1" onSubmit={handleSubmit}>
        <div id=".title" className="title" style={{ fontWeight: "bold", marginBottom: 8 }}>New Expense Form</div>

        <div>
          <label htmlFor="expense-name">Expense Name:</label>
          <input id="expense-name" value={name} onChange={(e) => setName(e.target.value)} />
          
        
          <label htmlFor="category-select">Select category:</label>
          <select id="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <br />
            <option value="">--select--</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="others">Others</option>
          </select>
          
        </div>
        <div>
          <br />
          <label htmlFor="expense-amount">Expense Amount:</label>
          <input id="expense-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div style={{ marginTop: 8 }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
