const nodemailer = require('nodemailer');

const NodeMailer = function () {

    this.sendMail = (data) => {
        const senderMail = "afproject19@gmail.com";
        const password = "CWP@2019";
        const receiverMail = data.email;
        const subject = data.subject;
        const body = data.body;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderMail,
                pass: password
            }
        });

        const mailOptions = {
            from: senderMail,
            to: receiverMail,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if(err){
                console.log(err);
            }
            console.log("Mail sent: %s", data.messageId);
        })
    }
};

module.exports = new NodeMailer();