import { ValidationPipe } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

export default registerAs('globalProviders', () => {
  return [
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        transform: false,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: 'APP_GUARD',
      useClass: IsAdminGuard,
    },
  ];
});
