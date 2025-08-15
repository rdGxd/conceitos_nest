import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(globalConfig)],
      inject: [globalConfig.KEY],
      useFactory: async (
        globalConfiguration: ConfigType<typeof globalConfig>,
      ) => {
        return {
          type: globalConfiguration.database.config.type,
          host: globalConfiguration.database.config.host,
          port: globalConfiguration.database.config.port,
          username: globalConfiguration.database.config.username,
          database: globalConfiguration.database.config.database,
          password: globalConfiguration.database.config.password,
          synchronize: globalConfiguration.database.config.synchronize,
          autoLoadEntities:
            globalConfiguration.database.config.autoLoadEntities,
        };
      },
    }),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [...globalConfig().providers],
  exports: [],
})
export class AppModule {}
