import { Router } from 'express';
import { UsersController } from '../controllers/users_controller';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from '../../../shared/http/middlewares/is_authenticated';
import UserAvatarController from '../controllers/user_avatar_controller';

export const usersRouter = Router();
const userController = new UsersController();
const avatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);
