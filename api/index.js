
require('./config/config.js') //config for mongodb, jws

const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { MailBox } = require("./models/mailbox")
const { BookInfo } = require("./models/bookinfo")
const { User } = require("./models/user")
const Client = require('@line/bot-sdk').Client;


const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
 channelAccessToken:  '+Z00sQIfBQjVouvA+bFr9LpyYi5pErdfu0hejVGhtzlEmw3RJRyV0V5tohj832ykJqb2S+6mcIRvWhw7V7PDpFNWzRZlVNLg59J8PU+71rxjCqPJxfSIET6QcCoU1Vcb6UnJSMb/I5qVtwr4XpIhKQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'cb7cdb67c6a8f02f2b7119365518108b'
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();


app.get('/webhook', async(req,res)=>{
    
   //req.session.current_user = null;
   res.send("xxx" );
 
})

app.get('/testdb', async (req,res)=>{
    
   //req.session.current_user = null;
   /*
     User.find({
        //all
    }).then((userlists)=>{ res.send({ userlists } );
    }).catch((e)=> { res.status(400).send(e) } );
   */
   
   
   
   
    var _mailbox = new MailBox({
                
                 from_user_id :  "xxx",
                 to_user_id :  "yyy",
                 message : "zzz",
                 lastupdate : new Date().getTime()
            });
    //_mailbox.save();
   
    await _mailbox.save();
    
    await res.redirect('/');
    
    //res.send("xxx" );
    /*
      var _user_role_1 = new User_Role({
                roleName : "Admin",
                roleId : 3,
                accessibilityLV: 3,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           
            var _user_role_2 = new User_Role({
               
              
                roleName : "Provider",
                roleId : 2,
                accessibilityLV: 2,
                isActive : true,
                lastupdate : new Date().getTime()
            });
          
          var _user_role_3 = new User_Role({
               
              
                roleName : "Secretary",
                accessibilityLV: 1,
                roleId : 1,
                isActive : true,
                lastupdate : new Date().getTime()
            });
         
            var _user_role_4 = new User_Role({
               
              
                roleName : "Customer",
                accessibilityLV: 0,
                roleId : 0,
                isActive : true,
                lastupdate : new Date().getTime()
            });
           await _user_role_1.save();
           await _user_role_2.save();
           await _user_role_3.save();
           await _user_role_4.save();
           await res.redirect('/');
           */
    
 
})




// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  
  /*  
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  */
  
  
  if (event.type !== 'message' ) {
    // ignore non-text-message event
    client.replyMessage(event.replyToken,  { type: 'text', text: "ERROR : Input message is not text or location." });
    return Promise.resolve(null);
  }
  if(!(event.message.type == 'text' || event.message.type == 'location'))
  {
    client.replyMessage(event.replyToken,  { type: 'text', text: "ERROR : Input message is not text or location." });
      return Promise.resolve(null);
  }
  

  // create a echoing text message
  //const echo = { type: 'text', text: event.message.text };
  
  //const echo = { type: 'text', text: "User: " + event.source.userId + ". Text : " + event.message.text};

  // use reply API
  //return client.replyMessage(event.replyToken, echo);
    /*
     var _mailbox = new MailBox({
                
                 from_user_id :  event.source.userId,
                 to_user_id :  "xxx",
                 message : event.message.text,
                 lastupdate : new Date().getTime(),
            });
    return _mailbox.save();
    */
    
    User.findOne({
         username : event.source.userId
        }).then((sender_user)=>{
            BookInfo.findOne({customer_id  : sender_user._id},
             {}, { sort: { 'lastupdate': -1 }}
            ).then((booking_info)=>{ 
                User.findOne({ _id : new ObjectId(booking_info.provider_id) }).then((provider_user)=>{
                    //Add data to db
                    
                    
                    var MsgInfo= "";
                    if(event.message.type == 'text')
                    {
                        MsgInfo = event.message.text;
                    }
                    else if(event.message.type == 'location')
                    {
                        MsgInfo = "address="+ event.message.address +
                        "&latitude="+event.message.latitude+
                        "&longitude="+event.message.longitude;
                    }
                    
                    
                    var _mailbox = new MailBox({
                        
                        from_user_web_id : sender_user._id,
                        from_user_line_id :  event.source.userId,
                        from_user_web_displayName : sender_user.displayName,
                        from_user_src_imageProfile : sender_user.picture,
                        to_user_web_id : provider_user._id,
                        to_user_line_id : "",
                        to_user_web_displayName : provider_user.displayName,
                        messageType : event.message.type,
                        messageInfo : MsgInfo,
                        IsSeen : false,
                        lastupdate : new Date().getTime(),
                        
                        
                        });
                    return _mailbox.save();
                    
                }).catch((e)=> { 
                    return client.replyMessage(event.replyToken,  { type: 'text', text: "This is message from system : Errors occured while searching provider info." });
                 } );
                
            }).catch((e)=> { 
                return client.replyMessage(event.replyToken,  { type: 'text', text: "This is message from system : Can not contact to providers because You did not booked any service yet." });
            } );
            
      
    }).catch((e)=> { 
        return client.replyMessage(event.replyToken,  { type: 'text', text: "This is message from system : Your line account is not registered for this service." });
            } );
    
    
    
    
  
}


module.exports = {
    path: '/api',
    handler: app
}