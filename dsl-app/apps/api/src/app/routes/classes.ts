import express = require('express');
import authConfig from '../auth/auth.config';
import { 
  getAllClasses, 
  getClass, 
  addClass, 
  updateClass, 
  deleteClass
} from '../controllers/classes';

const classRouter = express.Router();

classRouter.get('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  getAllClasses
]); 
classRouter.get('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  getClass
]); 
classRouter.post('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  addClass
]);
classRouter.put('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  updateClass
]);
classRouter.delete('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  deleteClass
]);

export default classRouter;
