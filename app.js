if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const wrapAsync = require('./utils/wrapAsync');
const AppError = require('./utils/AppError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');

const userRoutes = require('./routes/users');
const startRoutes = require('./routes/startroutes');
const { authenticate } = require('passport');

const dbUrl = process.env.DB_URL;


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })

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
app.use(express.static(path.join(__dirname, "views/otherCards")));
app.use(express.static(path.join(__dirname, "models/taskpanel")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const store = new MongoStore({
    url: dbUrl,
    secret: 'secretword',
    touchAfter: 24 * 60 * 60
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR, e")
})

const sessionConfig = {
    store,
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
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src-elem": ["self", "http://localhost:3000/js/bootstrap.min.js", "http://localhost:3000/scripts.js", "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js", "'unsafe-inline'"],
            "img-src": ["'self'", "wallpaperaccess.com", "www.w3.org"],
            "script-src-attr": ["'unsafe-inline'"]
        }
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
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