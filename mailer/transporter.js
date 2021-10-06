const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASSWORD;
const clientId = process.env.MAIL_CLIENT_ID;
const clientSecret = process.env.MAIL_SECRET;
const refreshToken = process.env.MAIL_REFRESH_TOKEN;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user,
    pass,
    clientId,
    clientSecret,
    refreshToken,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, 'templates'),
  })
);

module.exports = transporter;
