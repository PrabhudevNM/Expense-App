import { useState,useContext } from 'react' 
import axios from 'axios'
import ExpenseContext from './ExpenseContext'

export default function ExpenseForm(){

    const {expensesDispatch,categories}=useContext(ExpenseContext)

    const [expenseDate, setExpenseDate] = useState('')
    const [title, setTitle] = useState('') 
    const [amount, setAmount] = useState('')
    const [expenseCategory, setExpenseCategory] = useState('')
    const [description, setDescription] = useState('')
    const [expenseServerErrors, setExpenseServerErrors] = useState([])
    const [expenseClientErrors, setExpenseClientErrors] = useState({})
    const expenseErrors = {}

    const runExpenseClientValidation = () => {
        if(expenseDate.trim().length === 0) {
            expenseErrors.expenseDate = 'expense date cannot be empty'
        }  else if(new Date(expenseDate) > new Date()) {
            expenseErrors.expenseDate = 'expense date cannot be greater than today'
        }
        if(title.trim().length === 0) {
            expenseErrors.title = 'title cannot be empty'
        }
        if(amount.trim().length === 0) {
            expenseErrors.amount = 'amount cannot be empty'
        } else if(amount < 1) {
            expenseErrors.amount = 'amount should be greater or equal to 1'
        }
        if(expenseCategory.trim().length === 0) {
            expenseErrors.expenseCategory = 'expense category cannot be empty'
        }
        if(description.trim().length===0){
            expenseErrors.description='Description cannot be empty'
        }
    }

    const handleExpenseSubmit = (e) => {
        e.preventDefault() 
        const formData = {
            expenseDate: expenseDate,
            title: title, 
            amount: amount,
            category: expenseCategory,
            description: description
        }
        
        runExpenseClientValidation()
        
        if(Object.keys(expenseErrors).length === 0) {
            axios.post('http://localhost:3050/api/expenses', formData)
            .then((response) => {
                const result = response.data 
                expensesDispatch({type:'ADD_EXPENSE', payload: result})

                setExpenseServerErrors([])
                setExpenseClientErrors({})
                
                // resetform
                setExpenseDate('')
                setTitle('')
                setAmount('')
                setExpenseCategory('')
                setDescription('')
            })
            .catch((err) => {
                setExpenseServerErrors(err.response.data.errors)
            })
        } else {
            setExpenseClientErrors(expenseErrors)
        }
    }

    return (
        <div>
            <h2>Add Expense</h2>
            { expenseServerErrors.length > 0 && (
                <div>
                    <h3>Server Errors</h3>
                    <ul>
                        { expenseServerErrors.map((ele, i) => {
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul>
                </div> 
            )}
            <form onSubmit={handleExpenseSubmit}>
                <label>Expense Date</label> <br />
                <input 
                    type="date" 
                    value={expenseDate} 
                    onChange={e => setExpenseDate(e.target.value)} 
                />  
                { expenseClientErrors.expenseDate && <span> { expenseClientErrors.expenseDate } </span>}
                <br />

                <label>Title</label> <br /> 
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                /> 
                { expenseClientErrors.title && <span> { expenseClientErrors.title } </span>}
                <br /> 

                <label>Amount</label> <br /> 
                <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                /> 
                { expenseClientErrors.amount && <span> { expenseClientErrors.amount } </span> }
                <br />

                <label>Expense Category</label><br/>
                <select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)}>
                    <option value="">Select</option>
                    {categories.map((ele) => {
                        return <option key={ele._id} value={ele._id}>{ele.name}</option>
                    })}
                </select>
                { expenseClientErrors.expenseCategory && <span> { expenseClientErrors.expenseCategory } </span> }
                <br />

                <label>Description</label> <br /> 
                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                { expenseClientErrors.description && <span> { expenseClientErrors.description } </span> }
                <br /> 
                <input type="submit" /> 

            </form>
        </div>
    )
}