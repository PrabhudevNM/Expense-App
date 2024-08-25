const Expense = require('../model/expense-model')
const { validationResult} = require('express-validator')
const expenseCltr = {}

expenseCltr.create = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const body =req.body
    const expense = new Expense(body)
    expense.save()
    .then((expense)=>{
        res.status(201).json(expense)
    })
    .catch(()=>{
        res.status(500).json({error: 'something went wrong'})
    })
}

expenseCltr.list = (req,res) =>{
    Expense.find()
    .then((expense)=>{
        res.json(expense)
    })
    .catch((err)=>{
        res.status(500).json({error : 'something went wrong'})
    })
}

expenseCltr.show = (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }

    const id = req.params.id
    Expense.findById(id)

    .then((expense)=>{
        if(!expense)
        {
            return res.status(404).json({errors:'record not found'})
        }
        res.json(expense)
    })
    .catch()
}

expenseCltr.update = (req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const id = req.params.id
    const body = req.body
    Expense.findByIdAndUpdate(id,body, {new:true, runValidators:true})
    .then((expense)=>{
        res.json(expense)
    })
    .catch((err) =>{
        res.json(err)
    })
}

expenseCltr.remove=(req,res)=>{
    const id = req.params.id
    Expense.findByIdAndDelete(id)
    .then((expense)=>{
        if(!expense)
        {
            return res.status(404).json({error : 'record not found'})
        }
        res.json(expense)
    }) 
    .catch((error)=>{
        res.json(error)
    })
}


module.exports = expenseCltr