import { Module } from '@nestjs/common';
import { HashService } from './auth/hash-service';

@Module({
  providers: [HashService], // Registra os providers aqui
  exports: [HashService], // Exporta para outros módulos usarem
})
export class UtilsModule {}
