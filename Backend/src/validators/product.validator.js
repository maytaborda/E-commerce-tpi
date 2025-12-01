const { body, param, query} = require ('express-validator')

const createProductValidator = [
    body('name').isString().notEmpty(),
    body('description').optional().isString(),
    body('price').isFloat({ gt: 0 }),
    body('stock').optional().isInt({ min: 0 })
]

const updateProductValidator = [
    param('id').isMongoId(),
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('price').optional().isFloat({ gt: 0}),
    body('stock').optional().isInt({ min: 0 })
]

const paginationValidator = [
    query('page').optional().toInt().isInt({ min: 1}),
    query('limit').optional().toInt().isInt({ min: 1, max: 100})
]

module.exports =  {createProductValidator, updateProductValidator, paginationValidator}

