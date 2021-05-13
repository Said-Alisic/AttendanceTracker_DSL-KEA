import express = require('express');

const userRouter = express.Router();

import { 
  getAllUsers, 
  getUser, 
  signInUser,
  addUser, 
  updateUser, 
  deleteUser  } from '../controllers/users';

userRouter.get('/', getAllUsers); 
userRouter.get('/:id', getUser); 
userRouter.get('/sign-in', signInUser); 
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
