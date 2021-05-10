import dbConfig from '../db/db.config';
import jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['auth-token'];
  if (token == undefined) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
 
  jwt.verify(token, process.env.JWT_SECRET,  (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.id = decoded.id;
    next();
  });   
}

const isAdmin = (req, res, next) => {
  dbConfig.User.findByPk(req.id).then(user => {
    if (user.role === 'ADMIN') {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  });
};
  
const isTeacherOrAdmin = (req, res, next) => {
  dbConfig.User.findByPk(req.id).then(user => {
    if (user.role === 'ADMIN' || user.role === 'TEACHER') {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Teacher or Admin Role!',
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isTeacherOrAdmin: isTeacherOrAdmin,
  isAdmin: isAdmin,
};

export default authJwt;