var https = require('https');

exports.exports =   (event, context, callback) => {
    data = event.events[0];
    var replyToken = data.replyToken;
    var message = data.message;
    var txt = message.text;
    var data = JSON.stringify({
       replyToken: replyToken,
       messages: [
           {
               type: "text", 
               text: txt
           }
        ]
    });
    opts = {
        hostname: 'api.line.me',
        path: '/v2/bot/message/reply',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Content-Length": Buffer.byteLength(data),
            "Authorization": "Bearer " + "+Z00sQIfBQjVouvA+bFr9LpyYi5pErdfu0hejVGhtzlEmw3RJRyV0V5tohj832ykJqb2S+6mcIRvWhw7V7PDpFNWzRZlVNLg59J8PU+71rxjCqPJxfSIET6QcCoU1Vcb6UnJSMb/I5qVtwr4XpIhKQdB04t89/1O/w1cDnyilFU="
        },
        method: 'POST',
    };

    var req = https.request(opts, function(res) {
        res.on('data', function(res) {
            console.log(res.toString());
        }).on('error', function(e) {
            console.log('ERROR: ' + e.stack);
        });
    });
    callback(null, data);
    req.write(data);
    req.end();

};