const mongoose = require ('mongoose')

const purchaseSchema = new mongoose.Scheema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [
        {
            product:{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: {type: Number, required: true, min: 1},
            priceAtPurchase: {type: Number, required: true}
        }
    ],
    total: {type: Number, required: true},
    address: {type: String, required: true},
    purchaseAt: {type: Date, default: Date.now}
}, {timestamps: true })

module.exports = mongoose.model ('Purchase', purchaseSchema)
