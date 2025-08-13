import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/common/enums/UserRole';

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'The name of the user', maxLength: 100 })
  @Expose()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of the user' })
  @Expose()
  email: string;

  // @IsStrongPassword({ minLength: 5, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user', minLength: 5 })
  @Expose()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the user', enum: UserRole })
  @Expose()
  role: UserRole;
}
