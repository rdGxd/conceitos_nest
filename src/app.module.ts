import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './common/services/hash.service';
import { GlobalProvidersConfig } from './config/global-providers.config';
import globalConfig from './globa-config/globa.config';
import { GlobalConfigModule } from './globa-config/global-config.module';
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
  providers: [...GlobalProvidersConfig.get(), HashService],
  exports: [HashService],
})
export class AppModule {}
