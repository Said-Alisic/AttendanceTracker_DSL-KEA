import express = require('express');

const codeRouter = express.Router();

import { getAllCodes, getCode, getCodeByString, addCode, updateCode, deleteCode  } from '../controllers/codes';

codeRouter.get('/', getAllCodes); 
codeRouter.get('/:id', getCode); 
codeRouter.get('/code/:codeString', getCodeByString); 
codeRouter.post('/', addCode);
codeRouter.put('/:id', updateCode);
codeRouter.delete('/:id', deleteCode);

export default codeRouter;
