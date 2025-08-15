import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingServiceProtocol } from './hashing/hashing.service';

@Global() // Torna este módulo disponível globalmente
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
  ],
  exports: [
    HashingServiceProtocol, // Exporta o HashingServiceProtocol para que possa ser usado em outros módulos
  ],
})
export class AuthModule {}
