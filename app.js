const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.header('x-api-key'));
    next();
});

app.get('/', (req, res) => {
    if(fs.existsSync('logs')) fs.appendFileSync('logs', `\nGET : from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    else fs.writeFileSync('logs', `GET : from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);

    return res.json({
        message: `Request saving success.`
    });
});

app.post('/', (req, res) => {
    if(fs.existsSync('logs')) fs.appendFileSync('logs', `\nPOST : from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | HEADER : ${req.header('x-api-key')}`);
    else fs.writeFileSync('logs', `POST : from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | HEADER : ${req.header('x-api-key')}`);

    return res.send({
        message: `POST Request has been received`,
        from: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })
})

module.exports = app;