const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// const URI = process.env.URI
const URI = process.env.DB_URI;

const connecttoDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connected to the database");
    } catch (error) {
        console.log(`error in connect to database: ${error.message}`);
    }
};

module.exports = connecttoDb;