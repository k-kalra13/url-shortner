const express = require('express');
const connectDB = require('./connct'); // Import the database connection function
const app = express(); // we do this to create an express application, which is a function that can be used to configure and run a web server.
const URL = require('./models/url'); // Import the URL model
const {restrictToLoggedinUserOnly , checkAuth} = require("./middleware/auth");

const urlRoutes = require('./routes/url'); // Import the URL routes
const staticRoute = require('./routes/staticRouter'); // Import the static routes
const userRoute = require('./routes/user'); // Import the user routes

const port = 8000;
const Path = require('path'); // Import the path module for handling file paths
const cookieParser = require('cookie-parser');  // Import the cookie-parser middleware



connectDB("mongodb://127.0.0.1:27017/shorturl")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies 
app.use(cookieParser()); // Middleware to parse cookies from incoming requests



// agar tumhe routes ke under user ki details chahiye toh tumhe restrictToLoggedinUserOnly middleware use karna padega
app.use("/url", restrictToLoggedinUserOnly, urlRoutes); // Use the URL routes for any requests to /url
app.use("/user", userRoute); // Use the user routes for any requests to /user
app.use("/", checkAuth, staticRoute); // Use the static routes for the root path

app.get("/url/:shortid", async (req, res) => {
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

app.set('view engine', 'ejs');
app.set("views", Path.resolve("./views"));


// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.end(`
//         <html>
//             <head> </head>
//             <body> 
//                 <ol>
//                     ${allUrls.map(urlEntry => `<li> Original URL: ${urlEntry.originalUrl} <br> | Short URL: ${urlEntry.shortUrl} <br> | Created At: ${urlEntry.createdAt} <br> | Updated At: ${urlEntry.updatedAt} </li>`).join('')}
//                 </ol>

//             </body>
//         </html>
//         `)
// })



// this test route is to check if we can render the home.ejs file with the list of URLs

// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     res.render('home', {
//          urls: allUrls
//      });
// });

app.listen(port,()=> console.log(`Server is running on port: ${port}`));