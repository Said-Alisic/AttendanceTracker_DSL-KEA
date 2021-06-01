import express = require('express');
import authConfig from '../auth/auth.config';
import { 
  getAllAttendances, 
  getAttendance, 
  getAttendancesByClass,
  getAttendanceByStudentAndCode,
  getAttendanceStatsByClass,
  addAttendance, 
  addDefaultAttendances, 
  updateAttendance,
} from '../controllers/attendances';

const attendanceRouter = express.Router();

attendanceRouter.get('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacher, 
  getAllAttendances
]); 
attendanceRouter.get('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacher,
  getAttendance
]); 
attendanceRouter.get('/class/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacher, 
  getAttendancesByClass
]);
attendanceRouter.get('/stats/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacher, 
  getAttendanceStatsByClass
]);
attendanceRouter.get('/:codeId/:studentId', [
  authConfig.authParams.verifyCodeStudentIdParams,
  authConfig.authJwt.verifyToken, 
  getAttendanceByStudentAndCode
]);
attendanceRouter.post('/', [ 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacher,
  addAttendance
]);
attendanceRouter.post('/:codeId/:classId', [
  authConfig.authParams.verifyCodeClassIdParams, 
  // authConfig.authJwt.verifyToken, 
  // authConfig.authJwt.isTeacher,
  addDefaultAttendances
]);
attendanceRouter.put('/', [
  authConfig.authJwt.verifyToken, 
  updateAttendance
]);

export default attendanceRouter;
