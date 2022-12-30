import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/app_error';
import '@shared/typeorm';

const app = express();

app.use(cors());
//Define que a api trabalha com o padrão JSON
app.use(express.json());
//Rotas
app.use(routes);
//Middleware para interceptar erros
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error.',
        message: error.message,
      });
    }
    return response
      .status(500)
      .json({ status: 'error.', message: 'Internal server error.' });
  },
);
//Chama o servidor para acesso as rotas
app.listen(3333, () => {
  console.log('Server started on port 3333! 👨‍💻');
});
