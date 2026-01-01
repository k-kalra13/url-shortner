const shortid = require('shortid');
const URL = require('../models/url');  // Import the URL model for database operations


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'URL is required' });
    const shortId = shortid.generate(8); // Generate a unique short ID of length 8
    await URL.create({
        originalUrl: body.url, 
        shortUrl: shortId,
        visitHistory: []
    });
    console.log("Data inserted into the database");
    // return res.json({ id: shortId });
    return res.render('home', { id : `http://localhost:8000/url/${shortId}` });  // Render the home view with the generated short URL
}

async function handleGetUrlAnalytics(req, res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({ shortUrl: shortId });
        return res.json({ totalClicks: result.visitHistory.length,
             analytics: result.visitHistory, 
        });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetUrlAnalytics
};


