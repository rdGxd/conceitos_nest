import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GlobalConfigModule } from './global-config/global-config.module';
import globalConfig from './global-config/global.config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GlobalConfigModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(globalConfig().typeorm),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [...globalConfig().providers],
  exports: [],
})
export class AppModule {}
