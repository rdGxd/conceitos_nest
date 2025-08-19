import { Provider, ValidationPipe } from "@nestjs/common";
import { registerAs } from "@nestjs/config";

export default registerAs("globalConfig", () => {
  const environment = process.env.NODE_ENV;

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
    ] as Provider[],
    typeorm: {
      useFactory: () => {
        if (environment === "test") {
          return {
            autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES_TESTE),
            database: process.env.DATABASE_NAME_TESTE,
            host: process.env.DATABASE_HOST_TESTE,
            password: process.env.DATABASE_PASS_TESTE,
            port: Number(process.env.DATABASE_PORT_TESTE),
            synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE_TESTE),
            type: process.env.DATABASE_TYPE as "postgres",
            username: process.env.DATABASE_USER_TESTE,
            dropSchema: Boolean(process.env.DATABASE_DROPSCHEMA_TESTE),
          };
        }

        if (environment === "production") {
          return {
            autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
            database: process.env.DATABASE_NAME,
            host: process.env.DATABASE_HOST,
            password: process.env.DATABASE_PASS,
            port: Number(process.env.DATABASE_PORT),
            synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
            type: process.env.DATABASE_TYPE as "postgres",
            username: process.env.DATABASE_USER,
          };
        }

        if (environment === "development") {
          return {
            autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
            database: process.env.DATABASE_NAME,
            host: process.env.DATABASE_HOST,
            password: process.env.DATABASE_PASS,
            port: Number(process.env.DATABASE_PORT),
            synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
            type: process.env.DATABASE_TYPE as "postgres",
            username: process.env.DATABASE_USER,
          };
        }

        throw new Error("No valid environment found");
      },
    },
  };
});
