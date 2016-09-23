var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var EMAIL_FROM_ADDRESS = '"x24CV" <X24CV2016@gmail.com>';

var mailService = (function () {

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'rezility@gmail.com',
            pass: '#rezilityNC'
        }
    }));

    function sendMail(to, subject, body, callback) {
        // setup e-mail data with unicode symbols 
        var mailOptions = {
            from: EMAIL_FROM_ADDRESS,
            to: to,
            subject: subject,
            text: body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (callback) {
                callback(error, info);
            }
        });
    }
    return {
        sendMail: sendMail
    };
})();

module.exports = mailService;

