import express = require('express');

const classTeacherRouter = express.Router();

import { getAllClassTeachers, getClassTeacher, addClassTeacher, deleteClassTeacher  } from '../controllers/classTeachers';

classTeacherRouter.get('/', getAllClassTeachers); 
classTeacherRouter.get('/:id', getClassTeacher); 
classTeacherRouter.post('/', addClassTeacher);
classTeacherRouter.delete('/:id', deleteClassTeacher);

export default classTeacherRouter;
