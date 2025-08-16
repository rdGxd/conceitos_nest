import { SetMetadata } from '@nestjs/common';
import type { RoutePolicies } from 'src/auth/enums/route-policies.enum';
import { ROUTE_POLICY_KEY } from '../constants/auth.constants';

export const SetRoutePolicy = (args: RoutePolicies) => {
  return SetMetadata(ROUTE_POLICY_KEY, args);
};
