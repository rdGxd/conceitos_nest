import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AuthModule } from "./auth/auth.module";
import { GlobalConfigModule } from "./config/global/global-config.module";
import { typeOrmAsyncConfig } from "./config/global/typeorm.config";
import { EmailModule } from "./email/email.module";
import { MessagesModule } from "./messages/messages.module";
import { UsersModule } from "./users/users.module";

let envFilePath: string;

switch (process.env.NODE_ENV) {
  case "test":
    envFilePath = ".env.test";
    break;
  case "development":
    envFilePath = ".env.development";
    break;
  case "production":
    envFilePath = ".env.production";
    break;
  default:
    throw new Error(
      "NODE_ENV não está configurado leia o .env.example ou faça as alterações nos scripts em package.json",
    );
}
console.log(`Environment: ${process.env.NODE_ENV}`);

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000, // time to live em ms
        limit: 10, // máximo de request durante o ttl
        blockDuration: 5000, // tempo de bloqueio
      },
    ]),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
