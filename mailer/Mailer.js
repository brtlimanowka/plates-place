const transporter = require('./transporter');
const setMailOptions = require('./options');

class Mailer {
  constructor(user) {
    this.email = user.email;
    this.manageString = user.manageString;
  }
  sendActivationEmail = (host) => {
    const options = setMailOptions(
      'activate',
      host,
      this.email,
      this.manageString
    );
    transporter.sendMail(options, (error, ignored) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`\tSent activation email to ${this.email}`);
      }
    });
  };
  sendPasswordResetEmail = (host) => {
    const options = setMailOptions(
      'reset',
      host,
      this.email,
      this.manageString
    );
    transporter.sendMail(options, (error, ignored) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`\tSent password reset email to ${this.email}`);
      }
    });
  };
}

module.exports = Mailer;
