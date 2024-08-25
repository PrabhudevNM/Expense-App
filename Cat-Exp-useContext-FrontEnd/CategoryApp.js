import { useState } from "react";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import CategoryContext from "./CategoryContext";

export default function CatogryApp(){
    const [categories, setCategories] = useState([])


    return(
        <div>
            <h2>Expense App</h2>
            <CategoryContext.Provider value={{categories,setCategories}}>
            <CategoryList  />
            <CategoryForm  />  <hr/>
            </CategoryContext.Provider>
            
        </div>
    )
}
