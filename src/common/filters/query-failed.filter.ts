import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { error } from 'console';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const code = (exception.driverError as { code?: string }).code;

    // TODO 2: si code es el de "valor repetido", responde 409 con
    //         { statusCode: 409, error: 'Conflict', message: 'Ya existe un registro con ese valor' }
    //         pista: return response.status(409).json({ ... });
    if (code === "23505") {
      return response.status(409).json({
        statusCode: 409,
        error: " Conflict",
        message: "ya existe un registro con ese valor"
      })
    }
    // TODO 3: para cualquier otro error de la base, responde 500 genérico
    //         { statusCode: 500, message: 'Error interno' }
    
    return response.status(500).json({
        statusCode: 500,
        message:"error interno"
      })
  }
}