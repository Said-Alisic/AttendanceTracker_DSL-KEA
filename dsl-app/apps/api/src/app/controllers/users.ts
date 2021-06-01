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

export const getAllUsers = async (req: Request, res: Response) => {
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

export const getUser = async (req: Request, res: Response) => {
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

export const getAllStudents = async (req: Request, res: Response) => {
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

export const getAllTeachers = async (req: Request, res: Response) => {
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


// Gets all students belonging to a certain class
export const getClassStudents = async (req: Request, res: Response) => {
  try {
    await  dbConfig.User.findAll({
      where: {
        role: 'STUDENT',
      },
      include: [{
        model: dbConfig.ClassStudent,
        where: {
          class_id: req.params.id,
        },
        attributes: {
          exclude: ['class_id', 'student_id'],
        },
      }],
    })
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

// Gets all students not belonging to a certain class
export const getPossibleClassStudents = async (req: Request, res: Response) => {
  try {
    const query = 'CALL get_possible_students(:class_id);';

    await dbConfig.Sequelize.query(query, {
      replacements: {
        class_id: req.params.id
      },
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
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
      last_name:  req.body.last_name,
      email:  req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
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
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};
// process.env.BCRYPT_SALT as unknown as number
export const updateUser = async (req: Request, res: Response) => {
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

export const deleteUser = async (req: Request, res: Response) => {
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
export const signInUser = async (req: Request, res: Response) => {
  try {
    dbConfig.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(data => {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(401).send('Unauthorized user, credentials do not match!');
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
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};


