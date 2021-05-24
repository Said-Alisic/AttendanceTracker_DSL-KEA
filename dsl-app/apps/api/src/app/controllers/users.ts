/* eslint-disable no-console */
import {
  Request,
  Response
} from "express";
import dbConfig from '../db/db.config';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import {
  User,
  AuthUser,
} from '@dsl-app/api-interfaces';

export const getAllUsers = async (req, res) => {
  try {
    await dbConfig.User.findAll({})
      .then(data => res.status(200).json({
        message: 'Data retrieved successfully.',
        data,
      }));
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    await dbConfig.User.findByPk(req.params.id)
      .then(data => {
        if (data === null) {
          return res.status(404).json({
            message: 'No user found. Please try again.',
          });
        }
        return res.status(200).json({
          message: 'Data retrieved successfully.',
          data: data,
        });
      })
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};
// HERE
export const getAllStudents = async (req, res) => {
  try {
    await dbConfig.User.findAll({
      where: {
        role: "STUDENT",
      }
    })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};
// HERE
export const getAllTeachers = async (req, res) => {
  try {
    await dbConfig.User.findAll({
      where: {
        role: "TEACHER",
      }
    })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// export const getUsersByClass = async (req, res) => {
//     try {
//         await dbConfig.User.findAll({
//             where: {
//                 class_id: req.params.class_id
//             })
//             .then(data => {
//                 return res.status(200).json(data);
//             })
//             .catch(err => {
//                 return res.status(404).send(err);
//             })
//     } catch (err) {
//         return res.status(500).json('Internal server error');
//     }
// }

export const addUser = async (req: Request, res: Response) => {
  try {
    const newuser: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
      role: req.body.role,
    }

    await dbConfig.User.create(newuser)
      .then(data => {
        return res.status(200).json({
          message: 'User created successfully.',
          data: data,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

// process.env.BCRYPT_SALT as unknown as number
export const updateUser = async (req, res) => {
  try {
    const u = await dbConfig.User.findByPk(req.params.id);
    if (u) {
      await dbConfig.User.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        return res.status(200).json({
          message: 'User updated successfully.',
          data: req.body,
        });
      });
    } else {
      return res.status(404).json({
        message: 'No user found. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const u = await dbConfig.User.findByPk(req.params.id);
    if (u) {
      await dbConfig.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        return res.status(200).json({
          message: 'User deleted successfully.',
        });
      })
    } else {
      return res.status(404).json({
        message: 'No user found. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

// Sign in
export const signInUser = async (req: Request, res: Response) => {
  try {
    dbConfig.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(data => {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(401).json({
            message: 'Unauthorized user, credentials do not match!',
          });
        }
        const token: string = jwt.sign({
          id: data.id,
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        const authUser: AuthUser = {
          user: data,
          auth_token: token,
        };

        return res.status(200).send(authUser);
      })
      .catch(err => {
        return res.status(404).send(err);
      })
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};
