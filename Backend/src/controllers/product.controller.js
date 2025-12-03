const Product = require ('../models/Product')
const logger = require ('../utils/logger')

// GET /api/products?page=1&limit=10
exports.list = async (req, res) => {
    const page = parseInt (req.query.page) || 1
    const limit = Math.min(parseInt(req.query.limit) || 10, 100)
    const skip = (page - 1) * limit
    try {
        const [items, total] = await Promise.all([
            Product.find()
            .populate('owner', 'name email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
            Product.countDocuments()
        ])
        res.json({ page, limit, total, items })
    } catch (err){
        logger.error('Product list error: ' + err.message)
        res.status(500).json({ message: 'Server error' })
    }
} 

//GET /api/products/:id
exports.getOne = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id).populate('owner', 'name email')
        if (!product) return res.status(400).json({ message: 'Product not found'})
            res.json(product)
    } catch (err) {
        logger.error('Product getOne error: ' + err.message)
        res.status(500).json({ message: 'Server error' })
    }
}

//POST /api/products
exports.create = async (req, res) => {
    try {
        const { name, description, price, stock} = req.body
        const product = new Product({ name, description, price, stock: stock || 0, owner: req.user._id})
        await product.save()
        res.status(201).json(product)
    } catch (err){
        logger.error('Product create error: ' + err.message)
        res.status(500).json({ message: 'Server error'})
    }
}

//PUT /api/products/:id

exports.update = async (req, res) => {
    try {
        const updates = req.body
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })
            
// SOLO EL ADMIN PUEDE MODIFICAR O ACTUALIZAR
    if (product.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin')
        return res.status(403).json ({ message: 'Forbidden' })
        Object.assign(product, updates)
        await product.save()
        res.json(product)
    } catch (err) {
        logger.error('Product update error: ' + err.message)
        res.status(500).json({ message: 'Server error'})
    }
}

//DELETE /api/products/:id
exports.remove = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })
        if (product.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' })
        await product.remove()
        res.json({ message: 'Product deleted' })
    } catch (err) {
        logger.error('Product remove error: ' + err.message)
        res.status(500).json({ message: 'Server error' })
    }
}