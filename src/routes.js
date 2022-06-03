import { Router } from 'express';
import { UsersController } from './controllers/UserController.js';
import { TokenController } from './controllers/tokenController/TokenController.js';
import loginRequired from './middlewars/loginRequired.js';
import { FeedbackController } from './controllers/FeedbackController.js';

const router = Router();
const token = new TokenController();
//CREATE
const createUser = new UsersController();
//GET
const findUser = new UsersController();
const findAllUsers = new UsersController();
//UPDATE
const updateUser = new UsersController();
//DELETE
const deleteUser = new UsersController();

const feedbackController = new FeedbackController();

//POSTS
router.post('/users', createUser.createUser);
//GETS
router.get('/users/:id', loginRequired, findUser.findUser);
router.get('/users', findAllUsers.findAllUsers);
//UPDATES
router.put('/users/:id', loginRequired, updateUser.updateUser);
//DELETES
router.delete('/users/:id', loginRequired, deleteUser.deleteUser);

//POSTS
router.post('/feedbacks', feedbackController.createFeedback);
//GETS
router.get('/feedbacks/:id', loginRequired, feedbackController.findFeedback);
router.get('/feedbacks', feedbackController.findAllFeedbacks);
//UPDATES
router.put('/feedbacks/:id', loginRequired, feedbackController.updateFeedback);
//DELETES
router.delete(
  '/feedbacks/:id',
  loginRequired,
  feedbackController.deleteFeedback,
);

//TOKEN ROUTES
router.post('/token', token.handle);

/*
rota para lougout, destruir o token.
app.post('/logout', function(req, res) {
    res.json({ authorization: false, token: null });
})

*/
export { router };
