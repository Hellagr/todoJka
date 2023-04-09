const Kraken = require('kraken')
const express = require('express');
const router = express.Router();

const kraken = new Kraken({

    api_key: process.env.KRAKEN_KEY,
    api_secret: process.env.KRAKEN_SECRET
});
// console.log(JSON.stringify(req.file));


