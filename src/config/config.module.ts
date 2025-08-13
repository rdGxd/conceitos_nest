import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig], // exporta para outros módulos
})
export class AppConfigModule {}
