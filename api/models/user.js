var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
const _ = require("lodash");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");


var User_Schema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    hash: {
        type: String,
        required: false,
        trim: true
    },
    salt:{
        type: String,
        required: false,
    },
    firstname:{
        type: String,

    },
    lastname:{
         type: String,

    },
    email:{
         type: String,
    },
    tel:{
         type: String,
    },
    displayName:{
        type: String,
       
    },
    address:{
        type: String,
      
    },
    picture:{
        type: String,
    },
    
    loginType: {
        type: String,
        required: true,
    },
    
    isValidated: {
        type: Boolean,
        required: true,
    },
    
    
    USER_ROLE_id: {
        type: String,
        required: true,
        default: false
    },
    isValidated: {
        type: Boolean,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    
    lastUpdate: {
        type: Number,
        default: null
    },
});

//User_Schema.plugin(autoIncrement.plugin, 'User');    
var User= mongoose.model('User', User_Schema);
module.exports = { User };


/*
var mongoose = require("mongoose");
var LineUser = mongoose.model('LineUser', {
    userid: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    displayname:{
        type: String,
        required: true,
        minlength: 1,
        trim: false
    },
    picture:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    isfollow: {
        type: Boolean,
        required: true,
        default: false
    },
    isadmin: {
        type: Boolean,
        required: false,
        default: false
    },
    lastupdate: {
        type: Number,
        default: null
    },
});

module.exports = { LineUser };
*/