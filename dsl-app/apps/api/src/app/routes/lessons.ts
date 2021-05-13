import express = require('express');

const lessonRouter = express.Router();

import authConfig from '../auth/auth.config';

import { 
  getAllLessons, 
  getLesson, 
  addLesson, 
  updateLesson, 
  deleteLesson  } from '../controllers/lessons';

lessonRouter.get('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  getAllLessons,
]); 
lessonRouter.get('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  getLesson,
]); 
lessonRouter.post('/', [
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  addLesson,
]);
lessonRouter.put('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  updateLesson,
]);
lessonRouter.delete('/:id', [
  authConfig.authParams.verifyIdParam, 
  authConfig.authJwt.verifyToken, 
  authConfig.authJwt.isTeacherOrAdmin, 
  deleteLesson,
]);

export default lessonRouter;
