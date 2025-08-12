import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
