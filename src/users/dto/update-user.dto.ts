import { PartialType } from "@nestjs/mapped-types";
import { IsEnum } from "class-validator";
import { RoutePolicies } from "src/auth/enums/route-policies.enum";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(RoutePolicies, { each: true })
  routePolicies?: RoutePolicies[];
}
