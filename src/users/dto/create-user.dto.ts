import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Nome do usuário",
    minLength: 3,
    maxLength: 100,
    example: "João Silva",
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Expose()
  name: string;

  @ApiProperty({
    description: "E-mail do usuário",
    example: "joao@email.com",
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    minLength: 5,
    example: "123456",
  })
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}
