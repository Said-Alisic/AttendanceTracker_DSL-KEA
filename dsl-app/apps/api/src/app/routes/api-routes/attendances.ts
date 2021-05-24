import express = require('express');
import authConfig from '../../auth/auth.config';
import {
  getAllAttendances,
  getAttendance,
  getAttendancesByClass,
  addAttendance,
  addDefaultAttendances,
  updateAttendance
} from '../../controllers/attendances';

const attendanceRouter = express.Router();

attendanceRouter.get('/', [
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  getAllAttendances
]);
attendanceRouter.get('/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  getAttendance
]);
attendanceRouter.get('/class/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  getAttendancesByClass
]);
attendanceRouter.post('/', [
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  addAttendance
]);
attendanceRouter.post('/:codeId/:classId', [
  authConfig.authParams.verifyCodeClassIdParams,
  // authConfig.authJwt.verifyToken, 
  // authConfig.authJwt.isTeacherOrAdmin,
  addDefaultAttendances
]);
attendanceRouter.put('/', [
  authConfig.authJwt.verifyToken,
  updateAttendance
]);

export default attendanceRouter;
