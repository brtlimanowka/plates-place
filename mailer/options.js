const templates = require('./templates');
const DAEMON_ADDRESS = 'platesplace.daemon@gmail.com';

const setMailOptions = (template, host, recipient, manageString) => {
  const url = templates.getUrl(template, host, manageString);
  const emailSubject = templates.getSubject(template);
  const emailBody = templates.getBody(template, url);

  return {
    from: DAEMON_ADDRESS,
    to: recipient,
    subject: emailSubject,
    html: emailBody,
  };
};

module.exports = setMailOptions;
