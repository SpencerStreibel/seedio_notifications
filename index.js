var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill('jx5mDqtrFCdoAkM4o60F-A'), /*or new API key*/
    text = require('textbelt'),
    port = 4242,
    params = {
      "message": {
        "from_email": "connect@livio.com",
        "to": [{"email":"spencer@livioradio.com"}],
        "subject": "Subject; Change Me",
        "text": "Body. Change me."
      }
    };
app.get('/', function(req, res, next){
  res.send('Would you like to recieve email notification? Go to "http://localhost:' + port + '/emailme". \
  <br>Would you like to recieve text notification? Go to "http://localhost:' + port + '/textme".')
});
var server = app.listen(port, function(){
  var host = server.address().address;
  console.log('Listening at http://%s:%s', host, port);
})
//Sending email
app.get('/emailme', function(req, res, next){
    mandrill_client.messages.send(params, function(res){
      console.log(res);
    }, function(err){
      console.log(err);
    });
  res.send('Email sent');
});
//Sending text
app.get('/textme', function(req, res, next){
  var opts = {
      fromAddr: 'no-reply@livio.com', //Or other "from" address. Requires 'x@x.x'
      region: 'us',
      subject: 'Do not reply' //mandatory subject included as "(subject)"
  },
      phonumber = /*Insert Phone Number: XxxXxxXxxx*/;
  text.sendText(phonumber, 'This is a default message.', opts);
  console.log('Message sent to ' + phonumber);
  res.send('Text sent');
});
