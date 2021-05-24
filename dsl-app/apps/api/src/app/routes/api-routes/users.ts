import express = require('express');
import authConfig from '../../auth/auth.config';
import {
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  getUser,
  signInUser,
  addUser,
  updateUser,
  deleteUser,
} from '../../controllers/users';

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
// NOTE: uncomment authentication functions when deploying app to production server
userRouter.post('/', [
  // authConfig.authJwt.verifyToken, 
  // authConfig.authJwt.isAdmin, 
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
