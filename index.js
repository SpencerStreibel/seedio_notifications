var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill('jx5mDqtrFCdoAkM4o60F-A'), /*or new API key*/
    params = {
      "message": {
        "from_email": /*"livio@livio.io"*/,
        "to": [{"email":/*"request@email.com"*/}],
        "subject": /*"Notification Subject"*/,
        "text": /*"Notification body."*/
      }
    };
app.get('/', function(req, res, next){
  /*send email with: function sendTheMail(){
    m.messages.send(params, function(res){
      log(res);
    }, function(err){
      log(err);
    });
  }*/
  //return confirmation
  res.send('Email sent');
});
var server = app.listen(4242, function(){
  var host = server.address().address,
      port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
})
