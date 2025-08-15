import { Provider, ValidationPipe } from '@nestjs/common';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

export class GlobalProvidersConfig {
  static get(): Provider[] {
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
  }
}
