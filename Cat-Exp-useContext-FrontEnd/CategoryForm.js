import { useState,useContext } from 'react' 
import axios from 'axios'
import CategoryContext from './CategoryContext'

export default function CategoryForm(){
    const {categories,setCategories}=useContext(CategoryContext)
    const [categoryName, setCategoryName] = useState('')
    const [categoryServerErrors, setCategoryServerErrors] = useState([])
    const [categoryClientErrors, setCategoryClientErrors] = useState({})
    const categoryErrors = {}


    const handleAddCategory = (category) => {
        const newArr = [...categories, category]
        setCategories(newArr)
    }

    const runCategoryClientValidations = () => {
        if(categoryName.trim().length === 0) {
            categoryErrors.name = 'name cannot be empty'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: categoryName
        }

        runCategoryClientValidations()

        if(Object.keys(categoryErrors).length === 0) {            
            axios.post('http://localhost:3050/api/categories', formData)
            .then((response) => {
                alert('category was created')
                const result = response.data 
                handleAddCategory(result)

                setCategoryName('')
                // // clean up code 
                setCategoryServerErrors([])
                setCategoryClientErrors({})
            })
            .catch((err) => {
                console.log(err) 
                setCategoryServerErrors(err.response.data.errors)
            })
        } else {
            setCategoryClientErrors(categoryErrors)
        }
   
    }
    
    
    
    
    
    
    


    return (
        <div>
            <h2>Add Category</h2>
            { categoryServerErrors.length > 0 && (
                <div>
                    <h3>Server Errors</h3> 
                    <ul>
                        { categoryServerErrors.map((ele, i) => {
                            return <li key={i}>{ ele.msg } </li>
                        })}
                    </ul>
                </div> 
            )}

                <form onSubmit={handleSubmit}>
                    <label>Enter Name</label><br />
                    <input 
                        type="text" 
                        value={categoryName} 
                        onChange={(e) => {
                            setCategoryName(e.target.value) 
                        }} 
                    /> 
                    { categoryClientErrors.name && <span>{ categoryClientErrors.name }</span>}
                    <br />
                    <input type="submit" />
                </form>
        </div>
    )
}