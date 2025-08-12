import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //* remove chaves que nao estão no DTO
      forbidNonWhitelisted: true, //* retorna erro se a chave não estiver no DTO

      //* TENTE USAR O ParseIntPipe ou algo do tipo direto no controller
      transform: false, //* tenta transformar os tipos de dados de PARAM e DTOs
    }),
    // GLOBAL
    // new ParseStringUUIDPipe(),
    // new AddHeaderInterceptor(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
