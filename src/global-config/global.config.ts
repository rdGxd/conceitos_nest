import { ValidationPipe } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('globalConfig', () => ({
  providers: [
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        transform: false,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  typeorm: {
    useFactory: () => ({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASS,
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
    }),
  },
  environment: process.env.NODE_ENV || 'development',
}));
