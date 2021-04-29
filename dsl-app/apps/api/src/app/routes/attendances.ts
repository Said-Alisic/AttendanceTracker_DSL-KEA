import express = require('express');

const attendanceRouter = express.Router();

import { getAllAttendances, getAttendance, addAttendance, addDefaultAttendances, updateAttendance  } from '../controllers/attendances';

attendanceRouter.get('/', getAllAttendances); 
attendanceRouter.get('/:id', getAttendance); 
attendanceRouter.post('/', addAttendance);
attendanceRouter.post('/:codeId/classId', addDefaultAttendances);
attendanceRouter.put('/:id', updateAttendance);

export default attendanceRouter;
