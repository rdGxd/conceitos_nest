import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, throwError } from "rxjs";

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          if (error.name == "NotFoundException") {
            return new BadRequestException("Mensagem não encontrada");
          }

          return new BadRequestException("Ocorreu um erro desconhecido");
        });
      }),
    );
  }
}
