import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import type { RoutePolicies } from "src/auth/enums/route-policies.enum";

export class ResponseUserDto {
  @Expose()
  @ApiProperty({ example: "12345" })
  id: string;

  @Expose()
  @ApiProperty({ example: "John Doe" })
  name: string;

  @Expose()
  @ApiProperty({ example: "john.doe@example.com" })
  email: string;

  @Expose()
  @ApiProperty({ example: "2022-01-01T00:00:00Z" })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: "2022-01-01T00:00:00Z" })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    example: ["createMessage", "findOneMessage"],
  })
  routePolicies: RoutePolicies[];

  @Expose()
  @ApiProperty({ example: "user_picture.png", default: "" })
  picture: string;
}
