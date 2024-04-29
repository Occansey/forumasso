const express = require('express');
const router = require('./index1.js'); // Adjust this to the path where your router file is located
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/', router);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
