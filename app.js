const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Taskpanel = require('./models/taskpanel');
const morgan = require('morgan')




mongoose.connect('mongodb://localhost:27017/todojka', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "views/")));
app.use(express.static(path.join(__dirname, "models/taskpanel")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
    const taskpanels = await Taskpanel.find({});
    res.render('home', { taskpanels })
});

app.get("/404", async (req, res) => {
    res.render('404')
});

app.post("/", async (req, res) => {
    const taskpanel = new Taskpanel(req.body.taskpanel);
    await taskpanel.save();
    res.redirect(`/`);
});

app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const taskpanel = await Taskpanel.findByIdAndUpdate(id, { ...req.body.taskpanel });
    res.redirect('/');
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Taskpanel.findByIdAndDelete(id);
    res.redirect('/');
})

app.use((req, res) => {
    res.redirect('/404')
})


app.listen(3000, () => {
    console.log("It's OK!")
}); 