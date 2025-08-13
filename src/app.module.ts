import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimpleMiddleware } from './common/middlewares/simple.middleware';
import { AppConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { GlobalProvidersConfig } from './config/global-providers.config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [DatabaseConfig],
      useFactory: (dbConfig: DatabaseConfig) => {
        return dbConfig.getOptions();
      },
    }),
    UsersModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [...GlobalProvidersConfig.get()],
  exports: [],
})

// USANDO MIDDLEWARE
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplicando o middleware a todas as rotas
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
