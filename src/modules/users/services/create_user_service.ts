import AppError from '@shared/errors/app_error';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/users_repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findByEmail(email);
    if (userExists) {
      throw new AppError(`User with this address: ${email}, already exists.`);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}
