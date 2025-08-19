import { ValidationPipe } from "@nestjs/common";

export const globalPipes = [
  new ValidationPipe({
    transform: false,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
];
