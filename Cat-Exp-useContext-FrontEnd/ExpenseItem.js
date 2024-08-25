

// export default function ExpenseItem(props){
//     const {_id, expenseDate, amount, title, cat, handleRemove}=props


    
//     return <tr>
//         <td>{expenseDate}</td>
//         <td>{amount}</td>
//         <td>{title}</td>
//         <td>{cat ? cat.name : 'N/A'}</td>
//         <td>
//             <button onClick={() => handleRemove(_id)}>Remove</button>
//         </td>
//     </tr>
// }



import React from 'react';

export default function ExpenseItem(props) {

    const { _id, expenseDate, amount, title, category, categories, handleRemove }=props
    
    const foundCategory = categories.find((cat) => cat._id === category); // Find matching category

    return (
        <tr>
            <td>{expenseDate}</td>
            <td>{amount}</td>
            <td>{title}</td>
            <td>{foundCategory ? foundCategory.name : 'N/A'}</td> {/* Display category name */}
            <td>
                <button onClick={() => handleRemove(_id)}>Remove</button>
            </td>
        </tr>
    );
}
