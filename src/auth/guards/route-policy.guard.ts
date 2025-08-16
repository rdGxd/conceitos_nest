import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import type { User } from 'src/users';
import {
  REQUEST_TOKEN_PAYLOAD_KEY,
  ROUTE_POLICY_KEY,
} from '../constants/auth.constants';
import type { RoutePolicies } from '../enums/route-policies.enum';

@Injectable()
export class RoutePolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePolicyRequired = this.reflector.get<RoutePolicies | undefined>(
      ROUTE_POLICY_KEY,
      context.getHandler(),
    );

    if (!routePolicyRequired) {
      return true;
    }

    const tokenPayload = context.switchToHttp().getRequest()[
      REQUEST_TOKEN_PAYLOAD_KEY
    ];

    if (!tokenPayload) {
      throw new UnauthorizedException(
        `Rota requer permissão especial ${routePolicyRequired}. Usuário não logado.`,
      );
    }

    const { user }: { user: User } = tokenPayload;

    if (!user.routePolicies.includes(routePolicyRequired)) {
      throw new UnauthorizedException(
        `Usuário não tem a permissão para ${routePolicyRequired} para acessar a rota`,
      );
    }

    return true;
  }
}
