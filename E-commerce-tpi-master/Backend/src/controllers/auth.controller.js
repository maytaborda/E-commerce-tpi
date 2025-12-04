const jwt = require('jsonwebtoken')
const User = require('../models/User')
const logger = require('../utils/logger')


const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'tu_jwt_secreto_aqui', { expiresIn: process.env.JWT_EXPIRES_IN || '1d' })
}

exports.register = async (req, res) => {
    const {name, email, password } = req.body
    console.log(req.body)
    try {
        
        let user = await User.findOne({ email })
        if (user) return res.status(400).json ({ message: 'Email already in use' })
        user = new User({ name, email, password })
        await user.save()
        const token = generateToken(user)
        res.status(201).json({ user: {id: user._id, name: user.name, email: user.email }, token})
        } catch (err){
            logger.error('Register error: ' + err.message)
            res.status(500).json({ message: 'Server error'})
        }
    }

    exports.login = async (req, res) => {
        const {email, password} = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: 'Invalid credentials'})
            const isMatch = await user.comparePassword(password)
            if (!isMatch) return res.status(400).json ({ message: 'Invalid credentials' })
            const token = generateToken(user)
            res.json({ user: { id: user._id, name: user.name, email: user.email }, token })
            } catch (err){
            logger.error('Login error: ' + err.message)
            res.status(500).json({ message: 'Server error'})
            }
    }
