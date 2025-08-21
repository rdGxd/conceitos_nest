import { NestFactory } from "@nestjs/core";
import * as csurf from "csurf";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { globalPipes } from "./config/global/pipes.config";
import { swaggerConfig } from "./config/global/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  globalPipes(app);
  swaggerConfig(app);

  if (process.env.NODE_ENV === "production") {
    // HELMET -> cabeçalhos de segurança no protocolo HTTP
    app.use(helmet());

    // CORS -> permitir que o outro domínio faça request na sua aplicação
    app.enableCors({
      origin: "https://meuapp.com.br",
    });

    // CSURF -> proteção contra CSRF
    app.use(csurf.default());
  }

  await app.listen(Number(process.env.APP_PORT), "0.0.0.0");
}
void bootstrap();
