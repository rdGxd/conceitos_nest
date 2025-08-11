import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text is required' })
  @MinLength(5, { message: 'Text must be at least 5 characters long' })
  @MaxLength(255, { message: 'Text must be at most 255 characters long' })
  readonly text: string;

  @IsString({ message: 'Sender must be a string' })
  @IsNotEmpty({ message: 'Sender is required' })
  @MinLength(3, { message: 'Sender must be at least 5 characters long' })
  @MaxLength(50, { message: 'Sender must be at most 50 characters long' })
  readonly sender: string;

  @IsString({ message: 'Recipient must be a string' })
  @IsNotEmpty({ message: 'Recipient is required' })
  @MinLength(3, { message: 'Recipient must be at least 5 characters long' })
  @MaxLength(50, { message: 'Recipient must be at most 50 characters long' })
  readonly to: string;
}
