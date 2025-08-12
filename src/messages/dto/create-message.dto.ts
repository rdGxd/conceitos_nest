import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text is required' })
  @MinLength(5, { message: 'Text must be at least 5 characters long' })
  @MaxLength(255, { message: 'Text must be at most 255 characters long' })
  @ApiProperty({ example: 'Hello, world!' })
  readonly text: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Sender is required' })
  @ApiProperty({ example: '12345' })
  readonly senderId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Recipient is required' })
  @ApiProperty({ example: '67890' })
  readonly toId: string;
}
