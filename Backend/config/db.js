const mongoose = require("mongoose");
const logger = require ('../src/utils/logger')

const connect08 = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/backend_crud'

try {
    await mongoose.connect(uri, {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    })
    logger.info('Connected to MongoDB')
} catch (err) {
    logger.error('MongoDB connection error ' + err.message)
    throw err
}
}

module.exports = connectDB

