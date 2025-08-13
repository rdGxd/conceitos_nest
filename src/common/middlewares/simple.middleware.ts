import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Acessou o recurso ' + req.originalUrl);
    const authorization = req.headers['authorization'];

    if (authorization) {
      // Lógica para validar o token de autorização
      req['user'] = {
        id: 1,
        name: 'John Doe',
      };
    }

    // Terminando a requisição
    // return res.status(404).send({
    //   mensagem: 'Página não encontrada',
    // });

    next(); // Chama o próximo middleware ou rota

    res.on('finish', () => {
      console.log('SimpleMiddleware: Resposta enviada');
    });
  }
}
