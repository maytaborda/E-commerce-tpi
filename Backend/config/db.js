const mongoose = require("mongoose");
const logger = require ('../src/utils/logger')

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/backend_crud'

try {
    await mongoose.connect(uri)
    logger.info('Connected to MongoDB')
} catch (err) {
    logger.error('MongoDB connection error ' + err.message)
    throw err
}
}

module.exports = connectDB

