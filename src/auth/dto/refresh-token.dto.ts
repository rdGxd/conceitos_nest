import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({
    description: "Token de atualização JWT",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    minLength: 20,
    maxLength: 500,
  })
  @IsNotEmpty()
  refreshToken: string;
}
