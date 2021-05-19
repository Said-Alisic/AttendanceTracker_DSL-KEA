import express = require('express');
import userRouter from './users'
import classRouter from './classes'
import codeRouter from './codes'
import attendanceRouter from './attendances'
import classStudentRouter from './classStudents'
import classTeacherRouter from './classTeachers'


const router = express.Router();

router.use('/users', userRouter);
router.use('/classes', classRouter);
router.use('/codes', codeRouter);
router.use('/attendances', attendanceRouter);
router.use('/classStudents', classStudentRouter);
router.use('/classTeachers', classTeacherRouter);


export default router;
