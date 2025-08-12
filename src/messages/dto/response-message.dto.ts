import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { CreateMessageDto } from './create-message.dto';

export class ResponseMessageDto extends PartialType(CreateMessageDto) {
  @Expose()
  id: string;

  @Expose()
  senderId: string;

  @Expose()
  toId: string;

  @Expose()
  isRead: boolean;
  @Expose()
  createdAt?: Date;
  @Expose()
  updatedAt?: Date;
}
