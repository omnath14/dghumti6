const nodeMailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'dghumti@gmail.com',
            pass: ' '
        }
    }));

    return transporter
        .sendMail(emailData)
        .then(info => console.log(`Message sent: ${info.response}`))
        .catch(err => console.log(`Problem sending email: ${err}`));
};
