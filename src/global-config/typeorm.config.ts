import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: configService.get<string>(`TYPEORM_TYPE`) as any,
      host: configService.get<string>(`DATABASE_HOST`),
      port: Number(configService.get<string>(`DATABASE_PORT`)),
      username: configService.get<string>(`DATABASE_USER`),
      password: configService.get<string>(`DATABASE_PASS`),
      database: configService.get<string>(`DATABASE_NAME`),
      autoLoadEntities: Boolean(configService.get<string>(`DATABASE_AUTOLOADENTITIES`)),
      synchronize: Boolean(configService.get<string>(`DATABASE_SYNCHRONIZE`)),
      dropSchema: configService.get<string>("DATABASE_DROPSCHEMA") === "1",
    };
  },
};
