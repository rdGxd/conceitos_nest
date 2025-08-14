import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalProvidersConfig } from './config/global-providers.config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as any),
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASS,
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
    }),
    UsersModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [...GlobalProvidersConfig.get()],
  exports: [],
})
export class AppModule {}
