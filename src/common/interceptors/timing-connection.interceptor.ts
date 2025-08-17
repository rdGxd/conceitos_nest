import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { tap } from "rxjs";

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const startTime = Date.now();

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return next.handle().pipe(
      tap((data) => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
      }),
    );
  }
}
