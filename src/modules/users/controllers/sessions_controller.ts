import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/create_sessions_service';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = await new CreateSessionsService().execute({
      email,
      password,
    });
    return response.json(createSession);
  }
}
