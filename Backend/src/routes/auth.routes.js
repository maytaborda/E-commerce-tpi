
const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth.controller')
const validationMiddleware = require('../middlewares/validation.middleware')
const { registerValidator, loginValidator } = require('../validators/auth.validator')

router.post('/register', registerValidator, validationMiddleware, authCtrl.register)
router.post('/login', loginValidator, validationMiddleware, authCtrl.login)


module.exports = router