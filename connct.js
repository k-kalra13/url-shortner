const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // To suppress deprecation warning

async function connectDB(url) {
     return mongoose.connect(url);
}

module.exports = connectDB;