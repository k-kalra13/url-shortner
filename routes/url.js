const express = require('express');
const { handleGenerateNewShortUrl, handleGetUrlAnalytics } = require('../controllers/url');

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortid", handleGetUrlAnalytics)

module.exports = router;