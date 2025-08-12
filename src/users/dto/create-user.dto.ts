import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @MinLength(5)
  @IsString()
  password: string;

  @MinLength(5)
  @IsString()
  confirmPassword: string;
}
