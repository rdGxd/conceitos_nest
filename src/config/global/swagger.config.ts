import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = (app) => {
  const documentBuilderConfig = new DocumentBuilder()
    .setTitle("Messages API")
    .setDescription("Envie mensagens para seus amigos e familiares")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);

  return SwaggerModule.setup("docs", app, document);
};
