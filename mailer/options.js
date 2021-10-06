const templateService = require('./templates');
const DAEMON_ADDRESS = 'platesplace.daemon@gmail.com';

const setMailOptions = (template, host, recipient, manageString) => {
  const url = templateService.getUrl(template, host, manageString);
  const emailSubject = templateService.getSubject(template);
  const emailBody = templateService.getBody(template, url);

  return {
    from: DAEMON_ADDRESS,
    to: recipient,
    subject: emailSubject,
    html: emailBody,
  };
};

module.exports = setMailOptions;
