var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");


var BookInfo_Schema = new mongoose.Schema({

    provider_id:{
        type: String,
    },
    service_id:{
        type: String,
     
    },
    customer_id: {
         type: String,
    },
    quantity: {
        type: Number,
    },
    comment: {
         type: String,
    },
    isServed: {
         type: Boolean,
    },
    isCancelled: {
         type: Boolean,
    },
    lastupdate: {
        type: Number,
        default: null
    },
});




    
//BookInfo_Schema.plugin(autoIncrement.plugin, 'BookInfo');    
var BookInfo= mongoose.model('BookInfo', BookInfo_Schema);
module.exports = { BookInfo };

/*
var BookInfo= mongoose.model('BookInfo', {
   
    shopid:{
        type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    serviceid:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    userid: {
         type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    lastupdate: {
        type: Number,
        default: null
    },
});
*/
