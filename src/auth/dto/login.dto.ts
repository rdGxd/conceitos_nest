import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "E-mail do usuário",
    example: "user@email.com",
    minLength: 5,
    maxLength: 100,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    example: "123456",
    minLength: 5,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
