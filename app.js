const express = require('express');
const app = express();
const db = require('monk')('localhost/requestsLogs');

app.use(express.json());

app.get('/', (req, res) => {

    return res.json({
        message: `Request saving success.`
    });
});

module.exports = app;