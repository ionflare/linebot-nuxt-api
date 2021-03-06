
const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
 channelAccessToken:  'm81G1zHIiAVnjRzw8uaI5qmo67y52qDTFS/hbvlzZ2Rk+2duidmzb8BjBthXhSixTZNGTi+RcPVHA4swVQ6u7qny7mmOOQ1uOmoNQEmzn/v+KfOepBolIdQSWuaobWotiy+eujrcPRlRRwqL+o24BQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '63a9935f29b6291ad70f8338ba85d6a9'
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();


app.get('/webhook',async(req,res)=>{
    
   //req.session.current_user = null;
   res.send("yyy" );
 
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
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}


module.exports = {
    path: '/api2',
    handler: app
}

// listen on port
/*
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
*/