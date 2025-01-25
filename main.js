// Dependencies
const app = require("express")();

// Environment
require("dotenv").config();

// Utilities
const config = require("./config/config");

// DB Config
const dbConnection = {
	host: "45.130.164.28",
	user: "geodev",
	password: "geospheredev",
	database: "geosphere",
};
// const dbConnection = {
// 	host: "45.130.164.28",
// 	user: "geodev",
// 	database: "geosphere",
// 	password: "geospheredev",
// 	waitForConnections: true,
// 	connectionLimit: 10,
// 	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
// 	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
// 	queueLimit: 0,
// 	enableKeepAlive: true,
// 	keepAliveInitialDelay: 0,
// }

// Middlewares
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// App Components
const helloWorld = require("./app/hello-world")();
const topics = require("./app/topics")(dbConnection);
const authentication = require("./app/authentication")(dbConnection);
const student = require("./app/student")(dbConnection);
const badge = require("./app/badge")(dbConnection);
const feedback = require("./app/feedback")(dbConnection);
const section = require("./app/section")(dbConnection);

// Routes
app.use(helloWorld);
app.use(topics);
app.use(authentication);
app.use(student);
app.use(badge);
app.use(feedback);
app.use(section);

app.listen(config.port, () => {
	console.log(`Listening on port: ${config.port}...`);
});

// COMPONENT
// hello-world

// CONTROLLER
// Functions of component

// ROUTER
// Defines URL