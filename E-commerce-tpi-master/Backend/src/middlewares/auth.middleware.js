const jwt = require ('jsonwebtoken')
const User = require ('../models/User')
const logger = require('../utils/logger')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'No token provided'})
        const token = authHeader.split (' ')[1]
    if (!token) return res.status(401).json({ message: 'Malformed token'})

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secreto_aqui')
        const user = await User.findById(payload.id).select('-password')
        if (!user) return res.status(401).json({ message: 'User not found'})
        req.user = user
        next()
    } catch (err) {
        logger.error ('Auth error: ' + err.message)
        return res.status(401).json ({ message: 'Invalid token'})
    }
}

module.exports = authMiddleware