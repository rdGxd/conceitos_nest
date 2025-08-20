import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import jwtConfig from "../config/jwt.config";
import { AuthController } from "../controller/auth.controller";
import { AuthTokenGuard } from "../guards/auth-token.guard";
import { RoutePolicyGuard } from "../guards/route-policy.guard";
import { BcryptService } from "../hashing/bcrypt.service";
import { HashingServiceProtocol } from "../hashing/hashing.service";
import { AuthService } from "../service/auth.service";

@Global() // Torna este módulo disponível globalmente
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    AuthService,
    AuthTokenGuard,
    RoutePolicyGuard,
  ],
  exports: [
    HashingServiceProtocol, // Exporta o HashingServiceProtocol para que possa ser usado em outros módulos
    JwtModule,
    ConfigModule,
    AuthTokenGuard,
    RoutePolicyGuard,
  ],
})
export class AuthModule {}
