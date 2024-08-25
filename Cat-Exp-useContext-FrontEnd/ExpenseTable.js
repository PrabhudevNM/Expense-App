import React, { useContext } from 'react';
import axios from 'axios';
import ExpenseContext from './ExpenseContext';
import ExpenseItem from './ExpenseItem';

export default function ExpenseTable() {
    const { expenses, expensesDispatch, categories } = useContext(ExpenseContext);

    // Function to handle removal of an expense item
    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure you want to delete this expense?");
        if (userConfirm) {
            axios.delete(`http://localhost:3050/api/expenses/${id}`)
                .then((response) => {
                    expensesDispatch({ type: 'REMOVE_EXPENSES', payload: response.data });
                })
                .catch((err) => {
                    console.error("Error deleting expense:", err);
                    alert("Failed to delete expense.");
                });
        }
    };

    return (
        <div>
            <h2>Listing Expenses - {expenses.data.length}</h2>
            {expenses.data.length > 0 ? (
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.data.map((ele) => (
                                <ExpenseItem
                                    key={ele._id}
                                    {...ele}
                                    categories={categories}
                                    handleRemove={handleRemove}
                                />
                            ))}
                        </tbody>
                    </table>
                    <h3>Total Expenses - {expenses.data.reduce((acc, cv) => acc + cv.amount, 0)}</h3>
                </div>
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
}
