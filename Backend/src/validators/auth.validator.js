const { body } = require('express-validator')

const registerValidator = [
    body('name').isString().isLength({ min: 2}),
    body('email').isEmail(),
    body('password').isLength({ min: 6})
]

const loginValidator = [
    body('email').isEmail(),
    body('password').exists()
]

module.exports = { registerValidator, loginValidator }