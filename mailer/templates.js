const getUrl = (template, url, manageString) => {
  if (template === 'activation') {
    return `${url}/users/activate/${manageString}`;
  }
  if (template === 'reset') {
    return `${url}/users/reset/${manageString}`;
  }
};
const getSubject = (template) => {
  if (template === 'activation') {
    return "Activate your Plates' Place account";
  }
  if (template === 'reset') {
    return "Plates' Place password reset request";
  }
};
const getBody = (template, url) => {
  if (template === 'activation') {
    return `
    <h1>Welcome to Plates' Place!</h1>
    <div>
        <p>In order to complete your registration, you'll need to activate your account.</p>
        <p>You can do it by clicking <a href="${url}">this link</a>.</p>
        <p>Regards,</p>
        <p>Plates' Place Daemon</p>
    </div>
    `;
  }
  if (template === 'reset') {
    //
  }
};

module.exports = {
  getUrl,
  getSubject,
  getBody,
};
