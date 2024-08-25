const Category = require('../model/category-model')
const {checkSchema,validationResult} = require('express-validator')
const categoriesCltr = {}

categoriesCltr.list = (req,res)=>{
    Category.find()
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        console.log(err) 
        res.status(500).json({error:'something went wrong'})
    })
}

categoriesCltr.create = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const body =req.body
    const category = new Category(body)
    category.save()
    .then((category)=>{
        res.status(201).json(category)
    })
    .catch(()=>{
        res.status(500).json({error: 'something went wrong'})
    })
    
}

categoriesCltr.show =(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const id = req.params.id
    Category.findById(id)
    
        .then((category)=>{
            if(!category)
            {
                return res.status(404).json({ errors:'record not found'})
            }
            res.json(category)
        })
        .catch()
    
}

categoriesCltr.update = (req,res)=> {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const id = req.params.id
    const body = req.body
    Category.findByIdAndUpdate(id,body,{new:true, runValidators:true})
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        res.json(err)
    })
}


categoriesCltr.remove = (req,res) =>{
    const id = req.params.id
    Category.findByIdAndDelete(id)
    .then((categories)=>{
        if(!categories){
            return res.status(404).json({error: 'record not found'})
        }
        res.json(categories)
    })
    .catch((err)=>{
        res.json(err)
    })
}

 module.exports = categoriesCltr