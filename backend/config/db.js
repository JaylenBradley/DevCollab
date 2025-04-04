const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async (app, port) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch(err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectDB;