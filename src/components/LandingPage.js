import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetAllBudget,
} from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    budget: "",
    food: "",
    travel: "",
    entertainment: "",
    other: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, budget, food, travel, entertainment, other } = form;
    if (!name || !budget) {
      alert("Name and total budget must not be empty.");
      return;
    }

    const total = Number(budget);
    const f = Number(food || 0);
    const t = Number(travel || 0);
    const ent = Number(entertainment || 0);
    let o = Number(other || 0);

    const sum = f + t + ent + o;
    if (sum > total) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }
    if (sum < total) o += total - sum;

    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(total));
    dispatch(updateCategoricalBudget({ food: f, travel: t, entertainment: ent, others: o }));

    //if (window.confirm("Do you want to add this new budget?")) {
      alert("New expense data added successfully!");
      navigate("/tracker");
   // }
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Welcome to your own Expense Tracker</h1>
      <h4>Please fill in the below form to start tracking</h4>

      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Enter your Name:</label>
          <input id="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="budget">Enter your monthly budget:</label>
          <input id="budget" type="number" value={form.budget} onChange={handleChange} />
        </div>

        <h3>Fill your monthly Categorical budget:</h3>
        <table border="1" cellPadding="10" style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Food</th>
              <th>Travel</th>
              <th>Entertainment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input id="food" type="number" value={form.food} onChange={handleChange} /></td>
              <td><input id="travel" type="number" value={form.travel} onChange={handleChange} /></td>
              <td><input id="entertainment" type="number" value={form.entertainment} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 12 }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
