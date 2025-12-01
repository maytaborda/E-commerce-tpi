const { body } = require('express-validator')

const registerValidator = [
    body('name').isString().isLenght({ min: 2}),
    body('email').isEmail(),
    body('password').isLenght({ min: 6})
]

const loginValidator = [
    body('email').isEmail(),
    body('password').exists()
]

module.exports = {registerValidator, loginValidator}