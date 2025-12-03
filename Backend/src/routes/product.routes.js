const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/product.controller')
const auth = require('../middlewares/auth.middleware')
const validation = require('../middlewares/validation.middleware')
const { createProductValidator, updateProductValidator, paginationValidator } = require('../validators/product.validator')

router.get('/', paginationValidator, validation, productCtrl.list)

router.get('/:id', productCtrl.getOne)

router.post('/', auth, createProductValidator, validation, productCtrl.create)

router.put('/:id', auth, updateProductValidator, validation, productCtrl.update)

router.delete('/:id', auth, productCtrl.remove)

module.exports = router