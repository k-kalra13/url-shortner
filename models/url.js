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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,     // jo user ne yeh url create kiya hai uska id hoga yahan par
        ref: 'users',                              // reference to the users collection
    }
}, 
{ timestamps: true }
);
//This automatically adds: createdAt: "2025-01-01T10:00:00Z"    updatedAt: "2025-01-01T10:10:00Z"

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;





