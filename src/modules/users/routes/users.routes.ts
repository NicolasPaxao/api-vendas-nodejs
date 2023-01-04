import { Router } from 'express';
import { UsersController } from '../controllers/users_controller';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/is_authenticated';

export const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/', isAuthenticated, userController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: [
      {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    ],
  }),
  userController.create,
);
