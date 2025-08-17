import { PartialType } from "@nestjs/mapped-types";
import { IsEnum } from "class-validator";
import {
  RoutePolicies,
  USER_POLICIES,
} from "src/auth/enums/route-policies.enum";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum({
    type: "enum",
    enum: RoutePolicies,
    array: true,
    default: () => `'{${USER_POLICIES.join(",")}}'`,
  })
  routePolicies?: RoutePolicies[];
}
