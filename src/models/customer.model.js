let mongoose = require("mongoose");
require('dotenv').config();
//global variables
const SERVER = process.env.SERVER;
const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;

mongoose.connect(`mongodb+srv://${user}:${password}@${database}.lqm2wli.mongodb.net/?retryWrites=true&w=majority`);

//mongo is schemaless, so validation is done on application layer
let customerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Customer", customerSchema);