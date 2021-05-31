import express = require('express');
import authConfig from '../auth/auth.config';
import { 
  getAllClassTeachers, 
  getClassTeacher, 
  addClassTeacher, 
  deleteClassTeacher
} from '../controllers/classTeachers';

const classTeacherRouter = express.Router();

classTeacherRouter.get('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getAllClassTeachers
]); 
classTeacherRouter.get('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  getClassTeacher
]); 
classTeacherRouter.post('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  addClassTeacher
]);
classTeacherRouter.delete('/:classId/teacherId', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isAdmin, 
  deleteClassTeacher
]);

export default classTeacherRouter;
