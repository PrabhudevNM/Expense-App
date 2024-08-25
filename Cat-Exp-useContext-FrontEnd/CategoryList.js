import { useEffect,useContext } from "react"
import axios from "axios"
import CategoryContext from "./CategoryContext"

export default function CategoryList() {

    const {categories,setCategories}= useContext(CategoryContext)

    
    useEffect(()=>{
        axios.get('http://localhost:3050/api/categories')
            .then((response) => {
                const result = response.data
                // console.log(result)
                setCategories(result)
            })
            .catch((err) => {
                console.log(err)
            })

    },[setCategories])



    const handleRemoveCategory = (category) => {
        const newArr = categories.filter((ele) => {
            return ele._id !== category._id
        })
        setCategories(newArr)
    }


    const deleteCategory = (category) => {
        const userConfirm = window.confirm("Are you sure?")
        if (userConfirm) {
            axios.delete(`http://localhost:3050/api/categories/${category._id}`)
                .then((response) => {
                    const result = response.data
                    handleRemoveCategory(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <h2>Listing Categories - {categories.length}</h2>
            {categories.length > 0 && (
                <ul>
                    {categories.map((ele) => {
                        return <li key={ele._id}>{ele.name}
                            <button onClick={() => {
                                deleteCategory(ele)
                            }}>remove</button>
                        </li>
                    })}
                </ul>
            )}
        </div>
    )
}

