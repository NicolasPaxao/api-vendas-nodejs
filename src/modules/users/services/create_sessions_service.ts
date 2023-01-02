import AppError from '@shared/errors/app_error';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/users_repository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        `User doesn't exists with this address: ${email}`,
        401,
      );
    }

    const passwordConfirm = await compare(password, user.password);
    if (!passwordConfirm) {
      throw new AppError(`Incorret password combination.`, 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
