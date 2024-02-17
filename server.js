const express = require('express');

// Init express application
const app = express();

// Start listening on defined port
app.listen(4804, () => {
    console.log('Now listening on port ' + 4804);
});

// Serve static files
// app.use(express.static(__dirname + "/static/"));

// Serve React build
app.use(express.static(__dirname + "/client/build"));

// Serve react app
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});