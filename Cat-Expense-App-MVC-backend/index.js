const express = require('express')
const cors = require('cors')
const { checkSchema }= require('express-validator')
const app = express()
const port = 3050
const configureDB=require('./config/db')

const categoriesCltr= require('./app/controller/categories-cltr.js')
const { categoryValidationSchema , categoryidValidationSchema}= require('./app/validator/category-validator')

const expenseCltr = require('./app/controller/expense-cltr')
const {expenseIdValidationSchema, expenseValidationSchema} = require('./app/validator/expense-validator')


app.use(express.json())
app.use(cors())
configureDB()

 app.get('/api/categories',categoriesCltr.list)
 app.post('/api/categories',checkSchema(categoryValidationSchema), categoriesCltr.create)
 app.get('/api/categories/:id',checkSchema(categoryidValidationSchema,categoryValidationSchema), categoriesCltr.show)
 app.put('/api/categories/:id',checkSchema(categoryidValidationSchema,categoryValidationSchema), categoriesCltr.update)
 app.delete('/api/categories/:id',checkSchema(categoryidValidationSchema,categoryValidationSchema), categoriesCltr.remove)


app.post('/api/expenses',checkSchema(expenseValidationSchema),expenseCltr.create)
app.get('/api/expenses',checkSchema(expenseIdValidationSchema,expenseValidationSchema),expenseCltr.list)
app.get('/api/expenses/:id',checkSchema(expenseIdValidationSchema,expenseValidationSchema),expenseCltr.show)
app.put('/api/expenses/:id',checkSchema(expenseIdValidationSchema,expenseValidationSchema),expenseCltr.update)
app.delete('/api/expenses/:id',checkSchema(expenseIdValidationSchema,expenseValidationSchema),expenseCltr.remove)





app.listen(port,()=>{
    console.log('server running on port',port)
})