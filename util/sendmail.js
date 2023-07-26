const nodemailer = require("nodemailer");
require('dotenv').config({ path: './conf.env' });

const host = process.env.EMAIL_HOST;
const port = process.env.PORT;
const username = process.env.USERZ
const password = process.env.PASSWORD

async function sendMail(options) {
  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: username,
      pass: password,
    },
  });

  const mailOptions = {
    from: "admin <admin@mysite.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendMail;
