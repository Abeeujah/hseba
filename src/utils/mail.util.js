import config from "../../config/defaults.js";
import nodemailer from "nodemailer";

const mailerAccount = config["mailerAccount"];
const mailerPassword = config["mailerPassword"];

// Receipient address
// Message
// Subject
async function sendMail(part) {
  const mailer = mailerAccount;

  const mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mailer,
      pass: mailerPassword,
    },
  };

  const transporter = nodemailer.createTransport(mailConfig);

  const { message, subject, recipient } = part;
  const text = String(message);
  const mailOptions = {
    from: mailer,
    to: recipient,
    subject,
    text,
    html: `<p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }

    if (info) {
      console.log(info);
    }
  });
}

export default sendMail;
