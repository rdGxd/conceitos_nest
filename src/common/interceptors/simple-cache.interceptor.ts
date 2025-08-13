import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Simple cache interceptor called');
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log('Returning cached response', url);
      return of(this.cache.get(url));
    }

    return next.handle().pipe(
      tap((response) => {
        this.cache.set(url, response);
        console.log('Caching response for', url);
      }),
    );
  }
}
