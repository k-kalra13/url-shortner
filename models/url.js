const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [ {timestamp: {type: Number}}],
}, 
{ timestamps: true }
);
//This automatically adds: createdAt: "2025-01-01T10:00:00Z"    updatedAt: "2025-01-01T10:10:00Z"

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;





