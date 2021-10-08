const setMailOptions = (template, host, recipient, manageString) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = isProduction ? 'https' : 'http';
  let url = null;
  let subject;

  if (template === 'activate') {
    url = `${protocol}://${host}/api/users/activate/${manageString}`;
    subject = "Activate your Plates' Place account";
  }

  if (template === 'reset') {
    let urlHost = isProduction ? `https://${host}` : 'http://localhost:3000';
    url = `${urlHost}/reset/${manageString}`;
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
