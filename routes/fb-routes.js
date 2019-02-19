const express = require('express');
const fbRouter = express.Router();

const fbController = require('../controllers/fb-controller');

// fbRouterr.get('/', fbController.index);
fbRouter.post('/', fbController.create);
fbRouter.delete('/:id', fbController.destroy);
// fbRouter.get('/:id', fbController.show);
// fbRouter.get('/:id/edit', fbController.edit);
// fbRouter.put('/:id', fbController.update);


module.exports = fbRouter;