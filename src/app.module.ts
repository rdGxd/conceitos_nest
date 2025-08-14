import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { DatabaseConfigInterface } from './config/database/database-config.interface';
import { DatabaseConfig } from './config/database/database.config';
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
      useFactory: (dbConfig: DatabaseConfigInterface) => {
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
export class AppModule {}
