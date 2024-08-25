const mongoose = require('mongoose')
const { Schema , model}=mongoose

const expenseSchema = new Schema({
    title:String,
    description: String,
    amount:Number,
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    expenseDate:Date
})

const Expense = model('Expense',expenseSchema)

module.exports = Expense