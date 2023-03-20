//initialize
let express = require("express");
let app = express();
let personRoute = require("./routes/person");
let customerRoute = require("./routes/customer");
let path = require("path");
let bodyParser = require("body-parser");
//global variables
const HOST = process.env.HOST || "http://127.0.0.1";
const PORT = process.env.PORT || 3000;

//required to handle req.body for node.js
app.use(bodyParser.json()); 
//setup a middleware to log every incoming requests
app.use((req, resp, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
}); 

app.use(express.static("public")); //set static file directory
app.use(personRoute); //register person route
app.use(customerRoute); //register customer route

//setup a middleware to handle err 404 - Resource not found
app.use((req, resp, next) => {
   resp.status(404).send("404 - Resource not found!");
});

//setup a middleware to handle err 500
app.use((err, req, resp, next) => {
    console.error(err.stack);
    resp.sendFile(path.join(__dirname, "../public/error500.html"));
 });

//bind server host & port
app.listen(PORT, () => {
    console.info(`Server has started on ${HOST}:${PORT}`);
});