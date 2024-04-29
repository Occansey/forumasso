const express = require('express');
const routes = require('./app/routes'); // Import your routes file

const app = express();

// Use routes defined in the routes file
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3000; // Use the port specified in environment variable, or default to 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
