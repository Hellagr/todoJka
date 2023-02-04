const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Taskpanel = require('./models/taskpanel');
const morgan = require('morgan');
const wrapAsync = require('./utils/wrapAsync');
const AppError = require('./utils/AppError');

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

app.get("/", wrapAsync(async (req, res, next) => {
    const taskpanels = await Taskpanel.find({});
    res.render('home', { taskpanels })
}));

app.post("/", wrapAsync(async (req, res) => {
    if (!req.body.taskpanel) throw new AppError('Invalid Card Data!', 400);
    const taskpanel = new Taskpanel(req.body.taskpanel);
    await taskpanel.save();
    res.redirect(`/`);
}));

app.put('/:id', wrapAsync(async (req, res) => {
    if (!req.body.taskpanel) throw new AppError('Invalid Card Data!', 400);
    const { id } = req.params;
    const taskpanel = await Taskpanel.findByIdAndUpdate(id, { ...req.body.taskpanel });
    res.redirect('/');
}));

app.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Taskpanel.findByIdAndDelete(id);
    res.redirect('/');
}));

app.all('*', (req, res, next) => {
    next(new AppError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!';
    res.status(status).render('ErrorPage', { err });
})

app.listen(3000, () => {
    console.log("It's OK!")
}); 