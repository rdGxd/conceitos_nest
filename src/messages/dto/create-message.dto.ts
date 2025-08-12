import { Expose } from 'class-transformer';
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
  @Expose()
  readonly text: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Sender is required' })
  @Expose()
  readonly senderId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Recipient is required' })
  @Expose()
  readonly toId: string;
}
