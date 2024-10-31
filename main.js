// Dependencies
const app = require('express')();

// Environment
require('dotenv').config();

// Utilities
const config = require('./config/config'); 

// DB Config
const dbConnection = {
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12741860',
    password: 'tmnRHyhb9l',
    database: 'sql12741860'
}

// Middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// App Components
const helloWorld = require('./app/hello-world')();
const topics = require('./app/topics')(dbConnection);
const authentication = require('./app/authentication')(dbConnection);

// Routes
app.use(helloWorld);
app.use(topics);
app.use(authentication);

app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}...`);
});

// COMPONENT
// hello-world

// CONTROLLER
// Functions of component

// ROUTER
// Defines URL