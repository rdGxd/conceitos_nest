import { ApiProperty } from "@nestjs/swagger";

export class TokenPayloadDto {
  @ApiProperty({ description: "ID do usuário (subject)", example: "123" })
  sub: string;

  @ApiProperty({ description: "E-mail do usuário", example: "user@email.com" })
  email: string;

  @ApiProperty({ description: "Timestamp de emissão do token", example: 1692633600 })
  iat: number;

  @ApiProperty({ description: "Timestamp de expiração do token", example: 1692637200 })
  exp: number;

  @ApiProperty({ description: "Audience do token", example: "app" })
  aud: string;

  @ApiProperty({ description: "Issuer do token", example: "conceitos_nest" })
  iss: string;
}
