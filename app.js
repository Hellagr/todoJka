const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Userpanel = require('./models/userpanel')


mongoose.connect('mongodb://localhost:27017/todojka', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
    res.render('home')
});




app.listen(3000, () => {
    console.log("It's OK!")
});