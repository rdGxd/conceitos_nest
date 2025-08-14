import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database/database.config';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig],
})
export class AppConfigModule {}
