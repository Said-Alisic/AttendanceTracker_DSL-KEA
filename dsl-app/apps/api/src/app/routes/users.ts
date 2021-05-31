import express = require('express');
import authConfig from '../auth/auth.config';
import { 
  getAllUsers, 
  getAllStudents,
  getClassStudents,
  getPossibleClassStudents,
  getAllTeachers,
  getUser, 
  signInUser,
  addUser, 
  updateUser, 
  deleteUser
} from '../controllers/users';

const userRouter = express.Router();

userRouter.get('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getAllUsers
]); 
userRouter.get('/students', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getAllStudents
]); 
// Get all students belonging to a class of passed class id endpoint parameter
userRouter.get('/classStudents/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getClassStudents
]); 
// Get all students not belonging to a class of passed class id endpoint parameter
userRouter.get('/possibleClassStudents/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getPossibleClassStudents
]); 
userRouter.get('/teachers', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getAllTeachers
]); 
userRouter.get('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getUser
]); 
userRouter.post('/sign-in', [
  authConfig.authVerification.verifyExistingUser, 
  signInUser
]); 
userRouter.post('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  authConfig.authVerification.verifyNewUser, 
  addUser
]);
userRouter.put('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  updateUser
]);
userRouter.delete('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  deleteUser
]);

export default userRouter;
