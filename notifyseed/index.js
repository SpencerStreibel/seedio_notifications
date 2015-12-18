var Notify = function(apikey) {
      this.apikey = apikey
    },
    async = require('async');

Notify.prototype.emailing = function(from, to, sub, body, callback) {
  var mandrill = require('mandrill-api/mandrill'),
      mandrill_client = new mandrill.Mandrill(this.apikey);
  // Establish an array to include all required information substituted in by the user
  var params = {
        "message": {
          "from_email": from,
          "to": [{"email":to}],
          "subject": sub,
          "text": body
        }
      },
      // Include empty array for error information and description
      errlog = [],
      // Include starting point to increment for error&retry counter
      retries = 0;

  // Mandrill (mailchimp) has awful API. This sends stuff.
  mandrill_client.messages.send(params, sendAcknowledged, sendFailed);
  // Response object returned if send request understood. May still be unable to send
  function sendAcknowledged(res) {
    console.log(res);
    // Include potential error or success in error object
    errlog.push(res);
    // Response object defines a "status" trait.
    switch(res[0]['status']) {
      case 'invalid':
        // Include brief description of error in error object
        errlog.push('Invalid "to" address.');
        break;
      case 'rejected':
        // Include brief description of error in error object
        errlog.push('Message send unable to be completed.');
        break;
      case 'sent':
        // Set error to undefined to indicate no error occurred
        errlog = undefined;
        break;
      default:
        // Handle any errors not specified
        console.log('Unhandled error.')
        errlog.push('An unexpected error has occurred!');
    };
    // Return error object
    callback(errlog);
  };
  // Error object returned if send request failed
  function sendFailed(err) {
    console.log(err);
    // Include potential error in error object
    errlog.push(err);
    switch(err.code) {
      case -1/*'ENOTFOUND'*/:
        errlog.push('Send fail. Retrying...')
        // Exponential backoff and retry
        // Whilst(a, b, c) performs b asynchronously and repeatedly until a is false
        async.whilst(function() {
          // Compare number of attempts to a limit
          maxAttempts = retries < 4;
          // Recognize successful send
          sendSuccess = err == undefined;
          // Stop on either outcome
          return maxAttempts || sendSuccess
        },
        // Function to be repeated until number of attempts equals limit
        function(callback) {
          // Use setTimeout to delay next attempt
          setTimeout(callback, 1000 * Math.pow(2, retries));
          // Increment retry count
          retries++;
          console.log('Failed sends: ' + retries + '/5');
          // Retry sending (recursively?)
          
        },
        // Close whilst loop
        function(err) {
          if(errlog == undefined) {
            console.log('Send success after ' + retries + ' attempts!');
          } else {
            console.log('All attempts used.');
            // Include brief description of error in error object
            errlog.push('Connection error.');
          };
        })
        break;
      case -1:
        // Include brief description of error in error object
        errlog.push('Invalid API key.');
        break;
      case -2:
        // Include brief description of error in error object
        errlog.push('Invalid "from" address.')
        break;
      default:
        // Handle any errors not specified
        console.log('Unhandled error.');
        errlog.push('An unexpected error occurred!')
    };
    // Return error object
    callback(errlog);
  };
};

// Something Scott added to help me start that I never figured out
function createDelayMethod(number) {
  return function() {
    // do something...
  };
};

Notify.prototype.texting = function(from, to, sub, body, callback) {
  // Define necessary information as variables for user to substitute information
  var text = require('textbelt'),
      opts = {
        fromAddr: from,
        // Can specify region otherwise with 'canada' or else 'intl'
        region: 'us',
        subject: sub
      };
  // Send the message
  text.sendText(to, body, opts, function() {
    console.log('Message sent to ' + to);
  });
};
module.exports = Notify
