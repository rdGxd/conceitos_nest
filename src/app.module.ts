import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GlobalConfigModule } from './global-config/global-config.module';
import globalProvidersConfig from './global-config/global-providers.config';
import globalDatabase from './global-config/global-database.config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    GlobalConfigModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(globalDatabase)],
      inject: [globalDatabase.KEY],
      useFactory: async (
        globalConfiguration: ConfigType<typeof globalDatabase>,
      ) => {
        return {
          type: globalConfiguration.database.type,
          host: globalConfiguration.database.host,
          port: globalConfiguration.database.port,
          username: globalConfiguration.database.username,
          database: globalConfiguration.database.database,
          password: globalConfiguration.database.password,
          synchronize: globalConfiguration.database.synchronize,
          autoLoadEntities: globalConfiguration.database.autoLoadEntities,
        };
      },
    }),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [...globalProvidersConfig()],
  exports: [],
})
export class AppModule {}
