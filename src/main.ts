import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove chaves que nao estão no DTO
    transform: true, // faz a validação e transforma o objeto
    forbidNonWhitelisted: true, // retorna erro se a chave não estiver no DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
