const Purchase = require('../models/Purchase')
const Product = require('../models/Product')
const logger = require('../utils/logger')

//Lista de purchases
exports.list = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = Math.min(parseInt(req.query.limit) || 10, 100)
    const skip = (page - 1) * limit
    try {
        const [items, total] = await Promise.all([
        Purchase.find()
        .populate('buyer')
        .populate('products.product', 'name price')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
        Purchase.countDocuments()
    ])
        res.json({ page, limit, total, items })
} catch (err) {
    logger.error('Purchase list error:' + err.message)
    res.status(500).json({ message: 'Server error' })
    }   
}
    //Get one
    exports.getOne = async (req, res) => {
        try {
            const purchase = await Purchase.findById(req.params.id).populate('buyer', 'name email').populate('products.product', 'name price')
            if (!purchase) return res.status(404).json({ message: 'Purchase not found' })
                res.json(purchase)
        } catch (err) {
            logger.error('Purchase getOne error:' + err.message)
            res.status(500).json({ message: 'Server error'})
        }
    }

    //Create purchase
    exports.create = async (req, res) => {
        try {
            const { address, products } = req.body
            // Calculate total
            let total = 0
            for (const item of products) {
                const p = await Product.findById(item.product)
                if (!p) return res.status(400).json({ message: `Product ${item.product} not found` })
                if (p.stock < item.quantity) return res.status(400).json({ message: `Insufficient stock for product ${p._id}`})
                productsWithPrice.push({ product: p._id, quantity: item.quantity, priceAtPurchase: p.price })
                total += item.quantity * p.price

                //Decrement stock
                p.stock = p.stock - item.quantity
                await p.save()
            }

            const purchase = new Purchase({ buyer: req.user._id, address, products: productsWithPrice, total })
            await purchase.save()
            res.status(201).json(purchase)        
        } catch (err) {
            logger.error('Purchase create error:' + err.message)
            res.status(500).json({ message: 'Server error' })
        } 
    }

    //Update purchase (Solo admin)
    exports.update = async (req, res) => {
        try{
            const purchase = await Purchase.findById(req.params.id)
            if (!purchase) return res.status(404).json({ message: 'Purchase not found' })
            if (purchase.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbiden' })        
    
                Object.assign(purchase, req.body) 
                await purchase.save()
                res.json(purchase)
        } catch (err) {
                logger.error('Purchase update error: ' + err.message)
                res.status(500).json({ message: 'Server error'})
        }
    }
    
    // Delete purchase
    exports.remove = async (req, res) => {
        try{
            const purchase = await Purchase.findById(req.params.id)
            if(!purchase) return res.status(404).json({ messge: 'Purchase not found'})
                if (purchase.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin')
                    return res.status(403).json({ message: 'Forbidden' })
                await purchase.remove()
                res.json({ message: 'Purchase deleted' })
        }   catch (err) {
            logger.error('Purchase remove error: ' + err.message)
            res.status(500).json({ message: 'Server error' })
        }
    }
