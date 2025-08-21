import { INestApplication, ValidationPipe } from "@nestjs/common";

export const globalPipes = (app: INestApplication) => {
  // Global validation pipe configuration
  const pipes = [
    new ValidationPipe({
      transform: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ];

  app.useGlobalPipes(...pipes);
};
