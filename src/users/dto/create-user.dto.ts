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
  @ApiProperty({ description: 'O nome do usuário', maxLength: 100 })
  @Expose()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'O email do usuário' })
  @Expose()
  email: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'A senha do usuário', minLength: 5 })
  @Expose()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({
    description: 'O papel do usuário',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Expose()
  role: UserRole = UserRole.USER;
}
