
const moongose = require('mongoose')
const bcrypt = require('bcrypt')

const userSChema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user' },
    }, {timestamps: true})

    userSChema.pre('save', async function (next) {
        if (!this.isModified ('password')) return next()
        try{
        const salt = await bcrypt.gentSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
        } catch (err) {
            next (err)
        }
    })

    userSchema.methods.comparePassword = async function (candidate) {
        return bcrypt.compare(candidate, this.password)
    }

    module.exports = mongosee.model('User', userSchema)