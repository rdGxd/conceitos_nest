import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Expose()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword({ minLength: 5, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;
}
