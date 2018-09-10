
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


app.get('/webhook',async(req,res)=>{
    
   //req.session.current_user = null;
   res.send("xxx" );
 
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
    path: '/api',
    handler: app
}

// listen on port
/*
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
*/