import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Modifique os dados da resposta aqui
        return {
          ...data,
          modified: true,
          timestamp: new Date().toLocaleTimeString(),
        };
      }),
    );
  }
}
