

// // src/components/Header.jsx
// /* eslint-disable no-restricted-globals */
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { resetAllBudget } from "../redux/userSlice";
// import { removeAllTransactions } from "../redux/transactionSlice";
// import { resetAllExpense } from "../redux/expenseSlice";
// import { useNavigate } from "react-router-dom";

// export default function Header({ onUpdateClick }) {
//   const userName = useSelector((s) => s.user.userName);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleReset = () => {
//     setTimeout(() => {
//       if (window.confirm("Start a new tracker? This will clear budgets and expenses.")) {
//         dispatch(resetAllBudget());
//         dispatch(resetAllExpense());
//         dispatch(removeAllTransactions());
//         navigate("/");
//       }
//     }, 0);
//   };
//   // const handleReset = () => {
//   //   // Start new tracker full reset
//   //   if (confirm("Start a new tracker? This will clear budgets and expenses.")) {
//   //     dispatch(resetAllBudget());
//   //     dispatch(resetAllExpense());
//   //     dispatch(removeAllTransactions());
//   //     // store is exposed as window.store; tests can check window.store.getState()
//   //     navigate("/");
//   //   }
    
//   // };

//   // const handleReset  = () => {
//   //   // Directly reset Redux state
//   //   dispatch(resetAllBudget());
//   //   dispatch(removeAllTransactions());
  
//   //   // Reset the local form state
//   //   // setForm({
//   //   //   name: "",
//   //   //   budget: "",
//   //   //   food: "",
//   //   //   travel: "",
//   //   //   entertainment: "",
//   //   //   other: "",
//   //   // });
//   //   navigate("/");
//   // }; 

//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <h2>{userName ? `${userName}'s Monthly Expenditure` : "Tracker"}</h2>
//       <div>
//         <button id="new-update" onClick={onUpdateClick} style={{ marginRight: 8 }}>
//           New/Update tracker
//         </button>
//       </div>
//       <div>
//         <button id="clear" onClick={handleReset}>Sta1rt new tracker</button>
//         </div>
        
     
//     </div>
//   );
// }


// src/components/Header.jsx
/* eslint-disable no-restricted-globals */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAllBudget } from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { resetAllExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ onUpdateClick }) {
  const userName = useSelector((s) => s.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
