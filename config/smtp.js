require('dotenv').config()

module.exports = {
    host: 'smtp.gmail.com',
    port: 587,
    user: process.env.EMAIl_USER,
    pass: process.env.EMAIL_PASSWORD
}