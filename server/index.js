const express = require('express');
const routes = require('./app/allroutes'); // Import your routes file

const app = express();
app.use('/', routes);

const port = process.env.PORT || 3000; // Use the port specified in environment variable, or default to 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
