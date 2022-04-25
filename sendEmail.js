const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./config/smtp');

async function sendEmail(req, action) {

    const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass
        },
        tls: {
            rejectUnauthorized: false
        } 
    });

    const mailSent = await transporter.sendMail({
        from: SMTP_CONFIG.user,
        to: SMTP_CONFIG.user,
        subject: `Service Order ${action}`,
        text: `Order ${action}: 
        ${JSON.stringify(req)}`
    });
    console.log(mailSent);
}

module.exports = sendEmail;