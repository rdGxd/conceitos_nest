import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = (app: INestApplication) => {
  const documentBuilderConfig = new DocumentBuilder()
    .setTitle("Messages API")
    .setDescription("Envie mensagens para seus amigos e familiares")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);

  return SwaggerModule.setup("docs", app, document);
};
