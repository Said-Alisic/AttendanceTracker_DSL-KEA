import express = require('express');

const lessonRouter = express.Router();

import { 
  getAllLessons, 
  getLesson, 
  addLesson, 
  updateLesson, 
  deleteLesson  } from '../controllers/lessons';

lessonRouter.get('/', getAllLessons); 
lessonRouter.get('/:id', getLesson); 
lessonRouter.post('/', addLesson);
lessonRouter.put('/:id', updateLesson);
lessonRouter.delete('/:id', deleteLesson);

export default lessonRouter;
