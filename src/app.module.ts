import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
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
console.log(`Environment: ${process.env.NODE_ENV}`);
