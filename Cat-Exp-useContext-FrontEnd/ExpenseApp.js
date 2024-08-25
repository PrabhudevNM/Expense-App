import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';

import ExpenseContext from './ExpenseContext';

// Reducer for managing expenses state with if-else instead of switch
const ExpensesReducer = (state, action) => {
    if (action.type === 'SET_EXPENSES') {
        return { ...state, data: action.payload };
    } else if (action.type === 'REMOVE_EXPENSES') {
        return {
            ...state,
            data: state.data.filter((ele) => ele._id !== action.payload._id)
        };
    } else if (action.type === 'ADD_EXPENSE') {
        return { ...state, data: [...state.data, action.payload] };
    } else {
        return state;
    }
};

export default function ExpenseApp() {
    const [categories, setCategories] = useState([]);
    const [expenses, expensesDispatch] = useReducer(ExpensesReducer, { data: [] });

    // Fetch categories on mount
    useEffect(() => {
        axios.get('http://localhost:3050/api/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    // Fetch expenses on mount
    useEffect(() => {
        axios.get('http://localhost:3050/api/expenses')
            .then((response) => {
                expensesDispatch({ type: 'SET_EXPENSES', payload: response.data });
            })
            .catch((err) => {
                console.error("Error fetching expenses:", err);
            });
    }, []);

    return (
        <div>
            <h1>Expense App</h1>
            <ExpenseContext.Provider value={{ expenses, expensesDispatch, categories }}>
                <ExpenseTable expenses={expenses.data} categories={categories} />
                <ExpenseForm categories={categories} />
            </ExpenseContext.Provider>
        </div>
    );
}
