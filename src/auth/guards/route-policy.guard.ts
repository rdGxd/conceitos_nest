import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { User } from 'src/users';
import {
  REQUEST_TOKEN_PAYLOAD_KEY,
  ROUTE_POLICY_KEY,
} from '../constants/auth.constants';
import type { RoutePolicies } from '../enums/route-policies.enum';

@Injectable()
export class RoutePolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const routePolicyRequired = this.reflector.get<
      RoutePolicies | RoutePolicies[]
    >(ROUTE_POLICY_KEY, context.getHandler());

    // Se a rota não requer policy, libera
    if (!routePolicyRequired) return true;

    const tokenPayload = context.switchToHttp().getRequest()[
      REQUEST_TOKEN_PAYLOAD_KEY
    ];
    if (!tokenPayload) {
      throw new UnauthorizedException(
        `Rota requer permissão especial. Usuário não logado.`,
      );
    }

    const { user }: { user: User } = tokenPayload;
    const userPolicies = user.routePolicies ?? [];

    // Normaliza para array sempre
    const requiredPolicies = ([] as RoutePolicies[]).concat(
      routePolicyRequired,
    );

    const hasPermission = requiredPolicies.every((p) =>
      userPolicies.includes(p),
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        `Usuário não tem a permissão necessária: ${requiredPolicies.join(', ')}`,
      );
    }

    return true;
  }
}
