const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const usersRoute=require('./routes/usersRoute');
const dbConfig = require('./config/dbConfig');

app.use('/api/users',usersRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening on port " + port + "!");
});