var mongoose = require('mongoose');

var MailBox_Schema = new mongoose.Schema({
    from_user_id:{
        type: String,
    },
    to_user_id:{
        type: String,
    },
    message: {
         type: String,
    },
    lastupdate: {
        type: Number,
        default: null
    },
});


var MailBox = mongoose.model('MailBox', MailBox_Schema);
module.exports = { MailBox };

