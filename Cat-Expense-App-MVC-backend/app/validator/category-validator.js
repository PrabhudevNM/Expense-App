

const categoryValidationSchema = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: 'name is required'
        },
        notEmpty: {
            errorMesage: 'name cannot be empty'
        },
        trim: true 
    }
}

const categoryidValidationSchema = {
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'invalid mongodb id'
        }
    }
}

module.exports = {
    categoryValidationSchema,
    categoryidValidationSchema
}