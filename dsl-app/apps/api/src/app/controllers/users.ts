/* eslint-disable no-console */
import dbConfig from '../db/db.config';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import { User } from '@dsl-app/api-interfaces';

export const getAllUsers = async (req, res) => {
  try {
    await dbConfig.User.findAll()
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

export const getUser = async (req, res) => {
  try {
    await dbConfig.User.findByPk(req.params.id)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.status(404).send(err);
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

export const addUser = async (req, res) => {
  try {
    const newuser: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name:  req.body.last_name,
      email:  req.body.email,
      password: bcrypt.hashSync(req.body.password, process.env.BCRYPT_SALT),
      role:  req.body.role
    }

    await dbConfig.User.create(newuser)
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.status(404).send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const updateUser = async (req, res) => {
  try {
    await dbConfig.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      return res.status(200).json();
    })
      .catch(err => {
        return res.status(404).send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const deleteUser = async (req, res) => {
  try {
    await dbConfig.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      return res.status(200).json();
    })
      .catch(err => {
        return res.status(404).send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Sign in
export const signInUser = async (req, res) => {
  try {
    await dbConfig.User.findByPk(req.params.id)
      .then(data => {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(401).send('Unauthorized user, credentials do not match!');
        }
        const token = jwt.sign({
          id: data.id,
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return res.status(200).send({
          user: {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
          },
          accessToken: token,
        });
      })
      .catch(err => {
        return res.status(404).send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};


