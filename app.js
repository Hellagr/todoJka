const express = require('express');
const app = express();
const path = require('path');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/todojkaApp', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("It's OK!")
});