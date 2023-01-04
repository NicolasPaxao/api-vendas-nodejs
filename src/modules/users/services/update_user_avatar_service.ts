import AppError from '@shared/errors/app_error';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/users_repository';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFilename?: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const isUserAvatar = await fs.promises.stat(userAvatarFilePath);
      if (isUserAvatar) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}
