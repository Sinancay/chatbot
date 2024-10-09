const mongoose = require('mongoose');
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.error(error);
    }
}
module.exports = connectDb;