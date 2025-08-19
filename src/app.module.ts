import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth";
import { GlobalConfigModule } from "./config/global/global-config.module";
import { typeOrmAsyncConfig } from "./config/global/global-typeorm.config";
import { MessagesModule } from "./messages";
import { UsersModule } from "./users";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
      isGlobal: true,
    }),
    GlobalConfigModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
