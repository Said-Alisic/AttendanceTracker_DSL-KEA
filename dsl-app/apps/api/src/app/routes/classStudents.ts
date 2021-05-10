import express = require('express');

const classStudentRouter = express.Router();

import { 
  getAllClassStudents, 
  getClassStudent, 
  addClassStudent, 
  deleteClassStudent  } from '../controllers/classStudents';

classStudentRouter.get('/', getAllClassStudents); 
classStudentRouter.get('/:id', getClassStudent); 
classStudentRouter.post('/', addClassStudent);
classStudentRouter.delete('/:id', deleteClassStudent);

export default classStudentRouter;
