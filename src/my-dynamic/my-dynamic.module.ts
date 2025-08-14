import { DynamicModule, Module } from '@nestjs/common';

export interface MyDynamicModuleConfigs {
  apiKey: string;
  apiUrl: string;
}

export const MY_DYNAMIC_MODULE_CONFIG = 'MY_DYNAMIC_MODULE_CONFIG';

@Module({})
export class MyDynamicModule {
  static register(myModuleConfigs: MyDynamicModuleConfigs): DynamicModule {
    // Aqui eu vou usar minhas configurações

    return {
      module: MyDynamicModule,
      providers: [
        {
          provide: MY_DYNAMIC_MODULE_CONFIG,
          useValue: myModuleConfigs,
        },
      ],
      exports: [MY_DYNAMIC_MODULE_CONFIG], // ✅ Exporta para outros módulos
      imports: [],
      controllers: [],
    };
  }
}
