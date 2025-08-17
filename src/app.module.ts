import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
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
  ],
  controllers: [],
  providers: [...globalConfig().providers],
  exports: [],
})
export class AppModule {}
