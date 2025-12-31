const express = require('express');
const connectDB = require('./connct'); // Import the database connection function
const urlRoutes = require('./routes/url'); // Import the URL routes
const app = express(); // we do this to create an express application, which is a function that can be used to configure and run a web server.
const URL = require('./models/url'); // Import the URL model
const port = 8000;

connectDB("mongodb://127.0.0.1:27017/shorturl")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.use(express.json()); // Middleware to parse JSON request bodies


app.use("/url", urlRoutes); // Use the URL routes for any requests to /url

app.get("/:shortid", async (req, res) => {
    const shortId = req.params.shortid; // Extract the shortId from the URL parameters

    try {
        const entry = await URL.findOneAndUpdate(
            { shortUrl: shortId }, // Use the correct field name from your schema
            { $push: { visitHistory: { timestamp: Date.now() } } } // Update visit history
        );

        if (!entry) {
            return res.status(404).send("Short URL not found"); // Handle case where no entry is found
        }

        res.redirect(entry.originalUrl); // Redirect to the original URL
    } catch (error) {
        console.error("Error finding short URL:", error.message);
        res.status(500).send("Internal server error");
    }
});




app.listen(port,()=> console.log(`Server is running on port: ${port}`));