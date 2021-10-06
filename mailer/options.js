const setMailOptions = (template, host, recipient, manageString) => {
  const url = `https://${host}/api/users/${template}/${manageString}`;
  let subject;

  if (template === 'activate') {
    subject = "Activate your Plates' Place account";
  }

  if (template === 'reset') {
    subject = "Plates' Place password reset request";
  }

  return {
    from: process.env.MAIL_USER,
    to: recipient,
    subject,
    template,
    context: {
      url,
    },
  };
};

module.exports = setMailOptions;
