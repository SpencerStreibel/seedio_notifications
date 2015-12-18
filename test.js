var express = require('express'),
    app = express(),
    //mongoose = require('mongoose'),
    port = 4242,
    NotifySeed = require('./notifyseed'),
    server = app.listen(port, function() {
      var host = server.address().address;
      console.log('Listening at http://%s:%s', host, port);
    });

// Set up root
app.get('/', function(req, res, next) {
  res.send('Would you like to recieve email notification? \
  Go to "http://localhost:' + port + '/emailme". <br>\
  Would you like to recieve text notification? Go to "http://localhost:' + port + '/textme".')
});

  // Sending email
app.get('/emailme', function(req, res, next) {
  var mail = new NotifySeed('');  /*Insert Mandrill API Key*/
  mail.emailing('from@x.x', 'to@x.x', 'Subject', 'Body.', function(err) {
    if(err) {
      // Handle errors
      //next(err);
      res.send(err);
    } else {
      // It worked. Good job. Continue with doing the things.
      res.send('Message Sent');
    };
  });
});
/*
 * from@x.x / to@x.x ) requires "from" -> "[username]" ; e.g. "spencer"
 *                     requires "@"
 *                     requires "x.x" -> "[website].[generally "com"]" ; e.g. "gmail.com"
 *
 * Subject  ) can be blank, defaults to '(no subject)'
 *
 * Body. ) can be blank
 */

  // Sending text
app.get('/textme', function(req, res, next) {
  var smsText = new NotifySeed();
  smsText.texting('from@x.x', XxxToxXxxx, 'Subject', 'Body.', function(err) {
    if(err) {
      // Handle errors
      res.send(err);
      next(err);
    } else {
      // It worked. Good job. Continue with your things.
      res.send('Text message was sent.');
    }
  });
});
/*
 * from@x.x ) requires "from" -> "[username]" ; e.g. "spencer"
 *            requires "@"
 *            requires "x.x" -> "[website].[generally com]" ; e.g. "gmail.com"
 *            Tip! Use [Your Phone Number]@[YourCarrier.Endpoint] to provide a phone number
 *             that will appear as you provide it
 *
 * XxxToxXxxx ) destination number input without country calling code (such as +1) and no punctuation
 *                e.g. the number "1 (440)248-1632" would be input as "4402481632"
 *
 * Subject  ) can be blank, appears as first item in text as [Subject] contained
 *              within parentheses ; e.g. "(Subject) Body."
 *
 * Body.  ) can be blank
 */
