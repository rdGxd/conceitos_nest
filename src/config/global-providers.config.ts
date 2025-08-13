import { Provider, ValidationPipe } from '@nestjs/common';
import { MyExceptionFilter } from 'src/common/exceptions/my-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

export class GlobalProvidersConfig {
  static get(): Provider[] {
    return [
      {
        provide: 'APP_PIPE',
        useValue: new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
      },
      {
        provide: 'APP_FILTER',
        useClass: MyExceptionFilter,
      },
      {
        provide: 'APP_GUARD',
        useClass: IsAdminGuard, // Exemplo de guard global
      },
    ];
  }
}
