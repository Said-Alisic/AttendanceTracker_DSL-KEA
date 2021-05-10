import express = require('express');

const attendanceRouter = express.Router();

import { 
  getAllAttendances, 
  getAttendance, 
  getAttendancesByClass, 
  addAttendance, 
  addDefaultAttendances, 
  updateAttendance  
} from '../controllers/attendances';

attendanceRouter.get('/', getAllAttendances); 
attendanceRouter.get('/:id', getAttendance); 
attendanceRouter.get('/class/:classId', getAttendancesByClass); 
attendanceRouter.post('/', addAttendance);
attendanceRouter.post('/:codeId/:classId', addDefaultAttendances);
attendanceRouter.put('/', updateAttendance);

export default attendanceRouter;
