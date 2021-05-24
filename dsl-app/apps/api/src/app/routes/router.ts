import express = require('express');
import userRouter from './api-routes/users'
import classRouter from './api-routes/classes'
import codeRouter from './api-routes/codes'
import attendanceRouter from './api-routes/attendances'
import classStudentRouter from './api-routes/classStudents'
import classTeacherRouter from './api-routes/classTeachers'

const router = express.Router();

router.use('/users', userRouter);
router.use('/classes', classRouter);
router.use('/codes', codeRouter);
router.use('/attendances', attendanceRouter);
router.use('/classStudents', classStudentRouter);
router.use('/classTeachers', classTeacherRouter);

export default router;
