import React, { useState } from 'react';
import TrackerHeader from './XTrackerHeader';
import Insights from './Insights';
import NewExpenseForm from './NewExpenseForm';
import ExpensesTable from './ExpenseTable';
import { useDispatch } from 'react-redux';

const TransactionsPage = () => {
const [showModal, setShowModal] = useState(false);
const dispatch = useDispatch();


return (
<div style={{ padding: 20 }}>
<TrackerHeader onUpdate={() => setShowModal(true)} />
{showModal && (
<div style={{ background: '#fff', padding: 20, border: '1px solid #ccc' }}>
<h3>Update Budget</h3>
<button onClick={() => setShowModal(false)}>Go Back</button>
{/* budget form could be implemented here */}
</div>
)}
<Insights />
<NewExpenseForm />
<ExpensesTable />
</div>
);
};


export default TransactionsPage;