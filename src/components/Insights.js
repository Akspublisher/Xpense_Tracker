import React from "react";
import { useSelector } from "react-redux";

const currency = (x) => `Rs ${Number(x || 0).toFixed(2)}`;

export default function Insights() {
  const budgets = useSelector((s) => s.user.categoricalBudget);
  
  const expenses = useSelector((s) => s.transactions.transactionList);
  const cats = ["totalExpense","food", "travel", "entertainment", "others"];

  const spent = (cat) =>
    expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + Number(e.amount), 0);

  return (
    <div style={{ marginTop: 20 }}>
      
      <hr /><br/>
      <table border="1" cellPadding="6" style={{ width: "80%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Limit Status</th>
            <th>Budget</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => {
            const allocated = Number(budgets[cat] || 0);
            const current = spent(cat);
            const balance = allocated - current;
            return (
              <tr key={cat}>
                <td>{cat}</td>
                <td>{current <= allocated ? "within" : "exceed"}</td>
                <td>{(allocated)}</td>
                <td>{(current)}</td>
                <td>{(balance)}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
