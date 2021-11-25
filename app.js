// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

const projectName = 'crud-app';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// bind user to view - locals
app.use('/', (req, res, next) => {
    res.locals.user = req.session.user
    next()
})

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth/auth.routes');
app.use('/', authRoutes);

const dashboard = require('./routes/bashboard/index');
app.use('/', dashboard);

const cryptocurrency = require('./routes/cryptocurrency/index');
app.use('/', cryptocurrency);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

hbs.registerHelper('ifEqual', function (val1, val2, options) {
    if (val1 === val2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('ethPrice', function (total_price, decimals) {
    return total_price / Math.pow(10, decimals);

});

hbs.registerHelper('usdPrice', function (total_price, decimals, usd_price) {
    return (total_price / Math.pow(10, decimals) * usd_price).toFixed(2);
});
module.exports = app;