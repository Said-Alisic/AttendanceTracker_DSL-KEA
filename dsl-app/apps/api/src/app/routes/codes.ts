import express = require('express');

const codeRouter = express.Router();

import { getAllCodes, getCode, addCode, updateCode, deleteCode  } from '../controllers/codes';

codeRouter.get('/', getAllCodes); 
codeRouter.get('/:id', getCode); 
codeRouter.post('/', addCode);
codeRouter.put('/:id', updateCode);
codeRouter.delete('/:id', deleteCode);

export default codeRouter;
