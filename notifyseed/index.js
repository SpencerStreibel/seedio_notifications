var Notify = function(apikey) {
  this.apikey = apikey
}
Notify.prototype.emailing = function(from, to, sub, body, callback) {
  var mandrill = require('mandrill-api/mandrill'),
      mandrill_client = new mandrill.Mandrill(this.apikey),
      params = {
        "message": {
          "from_email": from,
          "to": [{"email":to}],
          "subject": sub,
          "text": body
        }
      },
      errlog = [];

  mandrill_client.messages.send(params, function(res) {
    console.log(res);
    errlog.push(res);
    switch(res[0]['status']) {
      case 'invalid':
        errlog.push('Invalid "to" address.');
        break;
      case 'rejected':
        errlog.push('Message send unable to be completed.');
        break;
      case 'sent':
        errlog = undefined;
        break;
      default:
        console.log('Unhandled error.')
        errlog.push('An unexpected error has occurred!');
    };
    callback(errlog);
  }, function(err) {
    console.log('A Mandrill error occurred:');
    console.log(err);
    errlog.push(err);
    switch(err.code) {
      case 'ENOTFOUND':
        errlog.push('Connection error.')
        break;
      case -1:
        errlog.push('Invalid API key.')
        break;
      case -2:
        errlog.push('Invalid "from" address.')
        break;
      default:
        console.log('Unhandled error.');
        errlog.push('An unexpected error occurred!')
    };
    callback(errlog);
  });
};
Notify.prototype.texting = function(from,/* you,*/ to, sub, body, callback) {
  var text = require('textbelt'),
      opts = {
        fromAddr: from,
        //fromName: you,    //Inoperable for texts
        region: 'us',
        subject: sub
      };
  text.sendText(to, body, opts, function() {
    callback()
    console.log('Message sent to ' + to);
  });
};
module.exports = Notify
