import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Não logado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  extractTokenFromHeader(context: Request): string | undefined {
    return context.headers['authorization']?.split(' ')[1] || undefined;
  }
}
