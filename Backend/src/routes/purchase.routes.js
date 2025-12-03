const express = require('express')
const router = express.Router()
const purchaseCtrl = require('../controllers/purchase.controller')
const auth = require('../middlewares/auth.middleware')
const validation = require('../middlewares/validation.middleware')
const { createPurchaseValidator, paginationValidator } = require('../validators/purchase.validator')

router.get('/', paginationValidator, validation, purchaseCtrl.list)

router.get('/:id', purchaseCtrl.getOne)

router.post('/', auth, createPurchaseValidator, validation, purchaseCtrl.create)

router.put('/:id', auth, purchaseCtrl.update)

router.delete('/:id', auth, purchaseCtrl.remove)

module.exports = router