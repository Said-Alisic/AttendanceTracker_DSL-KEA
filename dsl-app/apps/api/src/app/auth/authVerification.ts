import dbConfig from '../db/db.config';

const verifyExistingUser = (req, res, next) => {
  dbConfig.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(data => {
      if(data) {
        next();
      }
      return res.status(404).json('User does not exist!')
    })
    .catch(() => {
      return res.status(500).json('Internal server error!');
        
    })
}

const verifyNewUser = (req, res, next) => {
  dbConfig.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(data => {
      if (data) {
        return res.status(409).send('User already exists!');
      }
      next();
    })
    .catch(err => console.log(err));
};

const authVerification = {
  verifyExistingUser: verifyExistingUser,
  verifyNewUser: verifyNewUser,
};

export default authVerification;