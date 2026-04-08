const express = require('express');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`);
    next(); // move to next middleware
});

app.use((req, res, next) => {
    console.log("Second middleware executed");
    next();
});

const checkAuth = (req, res, next) => {
    console.log("Checking authentication...");
    next();
};

app.get('/home', checkAuth, (req, res) => {
    res.send("Welcome to Home Page");
});

app.get('/about', (req, res) => {
    res.send("About Page");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});