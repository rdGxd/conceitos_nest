import { ValidationPipe } from "@nestjs/common";
import { registerAs } from "@nestjs/config";

export default registerAs("globalConfig", () => {
  return {
    providers: [
      {
        provide: "APP_PIPE",
        useValue: new ValidationPipe({
          transform: false,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      },
    ],
    typeorm: {
      useFactory: () => {
        return {
          autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
          database: process.env.DATABASE_NAME,
          host: process.env.DATABASE_HOST,
          password: process.env.DATABASE_PASS,
          port: Number(process.env.DATABASE_PORT),
          synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
          type: process.env.DATABASE_TYPE as
            | "postgres"
            | "mysql"
            | "sqlite"
            | "mariadb"
            | "mongodb"
            | "mssql",
          username: process.env.DATABASE_USER,
        };
      },
    },
    environment: process.env.NODE_ENV || "development",
  };
});
