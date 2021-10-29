const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('X-AUTH-TOKEN');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ message: 'Authorization denied' });
    }
  }
};

module.exports = authMiddleware;
