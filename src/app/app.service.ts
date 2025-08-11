import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  exampleMethod(): string {
    return 'This is an example method!';
  }
}
