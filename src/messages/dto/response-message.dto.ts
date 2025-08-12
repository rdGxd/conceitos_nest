import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseMessageDto {
  @Expose()
  @ApiProperty({ example: '12345' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Hello, world!' })
  text: string;

  @Expose()
  @ApiProperty({ example: '12345' })
  senderId: string;

  @Expose()
  @ApiProperty({ example: '67890' })
  toId: string;

  @Expose()
  @ApiProperty({ example: false })
  isRead: boolean;

  @Expose()
  @ApiProperty({ example: '2022-01-01T00:00:00Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2022-01-01T00:00:00Z' })
  updatedAt: Date;
}
