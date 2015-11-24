var express = require('express'),
    app = express(),
    //mongoose = require('mongoose'),
    port = 4242,
    NotifySeed = require('./notifyseed');
app.get('/', function(req, res, next){
  res.send('Would you like to recieve email notification? Go to "http://localhost:' + port + '/emailme". \
  <br>Would you like to recieve text notification? Go to "http://localhost:' + port + '/textme".')
});
var server = app.listen(port, function(){
  var host = server.address().address;
  console.log('Listening at http://%s:%s', host, port);
});

//Sending email
app.get('/emailme', function(req, res, next){
  var mail = new NotifySeed('jx5mDqtrFCdoAkM4o60F-A'/*Insert API Key*/);
  mail.emailing('from@x.x', 'to@x.x', 'Subject', 'Body.', function(err){
    if(err){
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

//Sending text
app.get('/textme', function(req, res, next){
  var smsText = new NotifySeed();
  //extraneous without textbelt update: smsText.texting('from@x.x', 'Your Name (Optional: Defaults to "Textbelt" for email and is ignored in favor of <from@x.x> for text)', XxxToxXxxx/'to@x.x', 'Optional Subject', 'Body.', function(err){!!!});
  smsText.texting('from@x.x', XxxToxXxxx, 'Optional Subject', 'Body.', function(err){
    if(err){
      res.send(err);
    } else {
      res.send('Text message was sent.');
    }
  });
});
