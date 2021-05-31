import express = require('express');
import authConfig from '../auth/auth.config';
import { 
  getAllClassStudents, 
  getClassStudent, 
  addClassStudents, 
  deleteClassStudents
} from '../controllers/classStudents';

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
classStudentRouter.post('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  addClassStudents
]);
classStudentRouter.post('/delete/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  deleteClassStudents
]);

export default classStudentRouter;
