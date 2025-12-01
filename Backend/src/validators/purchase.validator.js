const {body, param, query } = require('express-validator')

const createPurchaseValidator = [
    body('adress').isString().notEmpty(),
    body('products').isArray({ min: 1 }),
    body('products.*product').isMongoId(),
    body('products.*quantity').isInt({ min: 1 })
]

const paginationValidator = [
    query('page').optional().toInt().isInt({ min: 1 }),
    query('limit').optional().toInt().isInt({ min: 1 })
]

module.exports = {createPurchaseValidator, paginationValidator}
