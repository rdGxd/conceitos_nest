import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";
import { AuthModule } from "./auth";
import { GlobalConfigModule } from "./global-config";
import globalConfig from "./global-config/global.config";
import { MessagesModule } from "./messages";
import { UsersModule } from "./users";

@Module({
  imports: [
    GlobalConfigModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(globalConfig().typeorm),
    UsersModule,
    MessagesModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), "pictures"),
      serveRoot: "/pictures",
    }),
  ],
  controllers: [],
  providers: [...globalConfig().providers],
  exports: [],
})
export class AppModule {}
