const Kraken = require('kraken'),
    fs = require('fs');
 
const kraken = new Kraken({
    api_key: KRAKEN_KEY,
    api_secret: KRAKEN_SECRET
});
 
var opts = {
    file: fs.createReadStream('file.jpg'),
    wait: true
};
 
kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);
    }
});