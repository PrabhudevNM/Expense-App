const Category = require('../model/category-model')
const expenseValidationSchema ={
    title:{
        in:['body'],
        exists:{
            errorMessage: 'title is required'
        },
        notEmpty:{
            errorMessage: 'title cannot be empty'
        },
        trim:true
    },
    amount:{
        in:['body'],
        exists:{
            errorMessage:'amount is required'

        },
        notEmpty:{
            errorMessage:'amount cannot be empty'
        },
        isFloat:{
            options:{ min:1},
            errorMessage:'amount should be greater than or equal to 1'
        },
        trim:true
    },
    category:{
        in:['body'],
        exists:{
            errorMessage:'category is required'
        },
        notEmpty:{
            errorMessage:'category cannot be empty'
        },
        isMongoId:{
            errorMessage:'invalid objectId provided'
        },
        custom:{
            options:function(value)
            {
                return Category.findById(value)
                .then((category)=>{
                    if(!category){
                        throw new Error ('category id doesnot exist in DB')
                    }
                    return true
                })
            }
        }
    },
    expenseDate:{
        in:['body'],
        exists:{
            errorMessage:'expense Date is required'
        },
        notEmpty:{
            errorMessage:'expense date cannot be empty'
        },
        isDate:{
            options:{ format: 'yyyy-mm-dd'}
        },
        custom:{
            options:function(value)
            {
                if(new Date(value) > new Date())
                {
                    throw new Error ('expense date cannot be greater than today')
                }
                return true
            }
        }
    }

}

const expenseIdValidationSchema ={}

module.exports ={
    expenseIdValidationSchema,
    expenseValidationSchema
}