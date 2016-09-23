var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'X24CV2016@gmail.com',
        pass: 'extentia'
    }
}));