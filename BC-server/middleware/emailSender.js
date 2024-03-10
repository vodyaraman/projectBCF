const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saevskii.dev@gmail.com',
        pass: 'zdbr xhqq rkhy esvf'
    }
});

const sendMail = (mailOptions) => {
    if (mailOptions) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Ошибка при отправке письма:', error);
            } else {
                console.log('Письмо успешно отправлено: ' + info.response);
            }
        });
    }
};

module.exports = sendMail;