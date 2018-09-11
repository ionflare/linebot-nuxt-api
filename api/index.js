
require('./config/config.js') //config for mongodb, jws

const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { MailBox } = require("./models/mailbox")
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
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  //const echo = { type: 'text', text: event.message.text };
  
  //const echo = { type: 'text', text: "User: " + event.source.userId + ". Text : " + event.message.text};

  // use reply API
  //return client.replyMessage(event.replyToken, echo);
  
     var _mailbox = new MailBox({
                
                 from_user_id :  event.source.userId,
                 to_user_id :  "xxx",
                 message : event.message.text,
                 lastupdate : new Date().getTime(),
            });
    return _mailbox.save();
  
  
}


module.exports = {
    path: '/api',
    handler: app
}