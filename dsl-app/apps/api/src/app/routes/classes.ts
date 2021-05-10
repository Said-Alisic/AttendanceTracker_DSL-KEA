import express = require('express');

const classRouter = express.Router();

import { 
  getAllClasses, 
  getClass, 
  addClass, 
  updateClass, 
  deleteClass  } from '../controllers/classes';

classRouter.get('/', getAllClasses); 
classRouter.get('/:id', getClass); 
classRouter.post('/', addClass);
classRouter.put('/:id', updateClass);
classRouter.delete('/:id', deleteClass);

export default classRouter;
