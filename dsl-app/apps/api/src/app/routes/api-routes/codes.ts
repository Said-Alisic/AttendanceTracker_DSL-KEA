import express = require('express');
import authConfig from '../../auth/auth.config';
import {
  getAllCodes,
  getCode,
  getCodeByString,
  addCode,
  updateCode,
  deleteCode,
} from '../../controllers/codes';

const codeRouter = express.Router();

codeRouter.get('/', [
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  getAllCodes,
]);
codeRouter.get('/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  getCode,
]);
codeRouter.get('/code/:codeString', [
  authConfig.authParams.verifyCodeStringParam,
  authConfig.authJwt.verifyToken,
  getCodeByString,
]);
codeRouter.post('/', [
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  addCode,
]);
codeRouter.put('/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isTeacherOrAdmin,
  updateCode
]);
codeRouter.delete('/:id', [
  authConfig.authParams.verifyIdParam,
  authConfig.authJwt.verifyToken,
  authConfig.authJwt.isAdmin,
  deleteCode
]);

export default codeRouter;
