const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const wrapAsync = require('./utils/wrapAsync');
const AppError = require('./utils/AppError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const startRoutes = require('./routes/startroutes');
const { authenticate } = require('passport');

mongoose.connect('mongodb://localhost:27017/todojka', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "views/")));
app.use(express.static(path.join(__dirname, "models/taskpanel")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const sessionConfig = {
    secret: 'secretword',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use('/', userRoutes);
app.use('/', startRoutes);


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