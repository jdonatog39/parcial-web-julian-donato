import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');   // imprime con la etiqueta [HTTP]

  use(req: Request, res: Response, next: NextFunction) {
    const fechaInicio = Date.now();

    res.on('finish', () => {
      // TODO 2: calcula cuántos ms pasaron desde la llegada
      const duracion = Date.now() - fechaInicio;
      // TODO 3: imprime con this.logger.log(...) algo como:
      //         "GET /users/me 200 - 12ms"
      //         pistas: req.method, req.originalUrl, res.statusCode
      this.logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duracion}ms`);
    });

    next();
  }
}