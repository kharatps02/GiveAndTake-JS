'user strict';
var gcm = require('node-gcm');
var SERVER_API_KEY = "AIzaSyB4_pRldZlFT-NECAx6SfrLs8Z2B986AZs";

var gcmService = (function() {
    // Set up the sender with you API key, prepare your recipients' registration tokens.
    var sender = new gcm.Sender(SERVER_API_KEY);

    function sendNotificationByTokens(regTokens,msgObj) {
        var message = new gcm.Message();
        var msgStr="New Cafe "+msgObj.name+" added at "+msgObj.location;
        message.addNotification('title', 'Cafe Alert!');
        message.addNotification('message', msgStr);

        sender.send(message, {
            registrationTokens: regTokens
        }, function(err, response) {
            if (err) console.error(err);
            else console.log(response);
        });
    };

    return {
        sendNotificationByTokens: sendNotificationByTokens
    };
})();


module.exports = gcmService;
