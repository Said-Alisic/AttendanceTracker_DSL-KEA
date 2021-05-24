import express = require('express');
import authConfig from '../../auth/auth.config';
import { 
  getAllClassStudents, 
  getClassStudent, 
  addClassStudent, 
  deleteClassStudent
} from '../../controllers/classStudents';

const classStudentRouter = express.Router();

classStudentRouter.get('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  getAllClassStudents
]); 
classStudentRouter.get('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  getClassStudent
]); 
classStudentRouter.post('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  addClassStudent
]);
classStudentRouter.delete('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  deleteClassStudent
]);

export default classStudentRouter;
