import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { globalPipes } from "./config/global/global-pipes.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(...globalPipes);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
