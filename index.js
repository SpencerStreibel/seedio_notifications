var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill('jx5mDqtrFCdoAkM4o60F-A'), /*or new API key*/
    port = 4242
    params = {
      "message": {
        "from_email": "spencer@livioradio.com",
        "to": [{"email":"spencer@livioradio.com"}],
        "subject": "Filling in the Blanks",
        "text": "Just a test, hold on until I know which way is up."
      }
    };
app.get('/', function(req, res, next){
  res.send('Would you like to recieve email notification? Go to "http://localhost:' + port + '/emailme".')
});
app.get('/emailme', function(req, res, next){
  //send email with:
  //function sendTheMail(){
    mandrill_client.messages.send(params, function(res){
      console.log(res);
    }, function(err){
      console.log(err);
    });
  //}
  //return confirmation
  res.send('Email sent');
});
var server = app.listen(port, function(){
  var host = server.address().address;
  console.log('Listening at http://%s:%s', host, port);
})
