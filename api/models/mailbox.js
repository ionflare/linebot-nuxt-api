var mongoose = require('mongoose');

var MailBox_Schema = new mongoose.Schema({
    from_user_web_id:{
        type: String,
    },
    from_user_line_id:{
        type: String,
    },
    from_user_web_displayName:{
        type: String,
    },
    from_user_src_imageProfile:{
        type: String,
    },
    
    to_user_web_id:{
        type: String,
    },
    to_user_web_displayName:{
        type: String,
    },
    messageType: {
         type: String,
    },
    messageInfo: {
         type: String,
    },
    IsSeen: {
        type: Boolean,
    },
    lastupdate: {
        type: Date,
        default: null
    },
});


var MailBox = mongoose.model('MailBox', MailBox_Schema);
module.exports = { MailBox };

