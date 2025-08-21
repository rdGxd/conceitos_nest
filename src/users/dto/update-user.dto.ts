import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { RoutePolicies } from "src/auth/enums/route-policies.enum";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "Políticas de rota do usuário",
    type: [String],
    required: false,
    example: ["findAllUsers", "createMessage"],
  })
  @IsEnum(RoutePolicies, { each: true })
  @IsOptional()
  routePolicies?: RoutePolicies[];
}
