var Notify = function(apikey){
  this.apikey = apikey
}
Notify.prototype.emailing = function(from, to, sub, body, callback){
  var mandrill = require('mandrill-api/mandrill'),
      mandrill_client = new mandrill.Mandrill(this.apikey),
      params = {
        "message": {
          "from_email": from,
          "to": [{"email":to}],
          "subject": sub,
          "text": body
        }
      };
      mandrill_client.messages.send(params, function(res){
        console.log(res);
        callback(undefined, true)
      }, function(err){
        console.log(err);
        callback(err, false)
      });
};
Notify.prototype.texting = function(from,/* you,*/ to, sub, body, callback){
  var text = require('textbelt'),
      opts = {
        fromAddr: from,
        //fromName: you,    //ignored for texts
        region: 'us',
        subject: sub
      };
  text.sendText(to, body, opts, function(){
    callback()
    console.log('Message sent to ' + to);
  });
};
module.exports = Notify
