const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in!" });
  try {
    const validToken = verify(accessToken, "importantsecret");

    req.user = validToken;
    if (validToken) {
      req.user = validToken;
      if (req.user.role !== 'tutor') {
        return res.json({ error: "Only tutors are allowed to create assignments!" });
      }   
      return next();
    }
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = validateToken;
