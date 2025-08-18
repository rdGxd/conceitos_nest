import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { User } from "src/users";
import type { Repository } from "typeorm";
import jwtConfig from "../config/jwt.config";
import { REQUEST_TOKEN_PAYLOAD_KEY } from "../constants/auth.constants";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Não logado");
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      const user = await this.userRepository.findOneBy({
        id: payload.sub as string,
        isActive: true,
      });

      if (!user) {
        throw new UnauthorizedException("Usuário não autorizado!");
      }

      payload["user"] = user;

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.messages);
    }
    return true;
  }

  extractTokenFromHeader(context: Request): string | undefined {
    return context.headers["authorization"]?.split(" ")[1] || undefined;
  }
}
