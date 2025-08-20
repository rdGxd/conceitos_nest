import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AuthModule } from "./auth/auth.module";
import { GlobalConfigModule } from "./config/global/global-config.module";
import { typeOrmAsyncConfig } from "./config/global/global-typeorm.config";
import { MessagesModule } from "./messages/messages.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
      isGlobal: true,
    }),
    GlobalConfigModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), "pictures"),
      serveRoot: "/pictures",
    }),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
