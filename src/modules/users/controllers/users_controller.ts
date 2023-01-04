import { Request, Response } from 'express';
import { CreateUserService } from '../services/create_user_service';
import { ListUsersService } from '../services/list_users_service';

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = await new ListUsersService().execute();
    return response.json(listUsers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.json(user);
  }
}
