const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/user-controller');

userRouter.get('/', userController.index);
userRouter.post('/', userController.create);

userRouter.get('/:id', userController.show);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.destroy);

module.exports = userRouter;