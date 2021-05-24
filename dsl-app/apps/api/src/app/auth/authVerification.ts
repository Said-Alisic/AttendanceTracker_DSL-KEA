import {
  Request,
  Response,
  NextFunction
} from 'express';
import dbConfig from '../db/db.config';

const verifyExistingUser = (req: Request, res: Response, next: NextFunction) => {
  dbConfig.User.findOne({
    where: {
      email: req.body.email
    },
  })
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: 'User does not exist!'
        })

      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        message: `Internal server error: ${err}`,
      });
    })
}

const verifyNewUser = (req: Request, res: Response, next: NextFunction) => {
  dbConfig.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(data => {
      if (data) {
        return res.status(409).json({
          message: 'User already exists!'
        });
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
