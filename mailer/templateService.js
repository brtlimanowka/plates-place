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
    //
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
