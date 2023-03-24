const Kraken = require('kraken'),
    fs = require('fs');
 console.log(fs)
const kraken = new Kraken({
    api_key: process.env.KRAKEN_API,
    api_secret: process.env.KRAKEN_SECRET
});
const opts = {
    file: fs.createReadStream('upload.single'),
    wait: true
};