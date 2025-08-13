import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface DatabaseConfigInterface {
  getOptions(): TypeOrmModuleOptions;
}
