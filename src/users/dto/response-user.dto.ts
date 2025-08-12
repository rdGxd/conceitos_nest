import { OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @Expose()
  id: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
