import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfigInterface } from './database-config.interface';

@Injectable()
export class DatabaseConfig implements DatabaseConfigInterface {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'postgres' | 'mysql'>('DB_TYPE'),
      host: this.configService.get<string>('DB_HOST') as string,
      port: this.configService.get<number>('DB_PORT') as number,
      username: this.configService.get<string>('DB_USER') as string,
      password: this.configService.get<string>('DB_PASS') as string,
      database: this.configService.get<string>('DB_NAME') as string,
      autoLoadEntities: true,
      synchronize: true, // ⚠ Apenas em DEV
    } as TypeOrmModuleOptions;
  }
}
