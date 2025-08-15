import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HashingServiceProtocol } from './auth/hashing/hashing.service';

import { GlobalConfigModule } from './global-config/global-config.module';
import { GlobalProvidersConfig } from './global-config/global-providers.config';
import globalConfig from './global-config/global.config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    GlobalConfigModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(globalConfig)],
      inject: [globalConfig.KEY],
      useFactory: async (
        globalConfiguration: ConfigType<typeof globalConfig>,
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
  ],
  controllers: [],
  providers: [...GlobalProvidersConfig.get(), HashingServiceProtocol],
  exports: [HashingServiceProtocol],
})
export class AppModule {}
