
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');



mongoose.Promise = global.Promise;

var connection = mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
autoIncrement.initialize(db);

module.exports = { mongoose };