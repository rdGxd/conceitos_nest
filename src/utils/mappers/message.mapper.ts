import { plainToInstance } from 'class-transformer';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ResponseMessageDto } from 'src/messages/dto/response-message.dto';
import { Message } from 'src/messages/entities/message.entity';

export class MessageMapper {
  static async toEntity(dto: CreateMessageDto): Promise<Message> {
    return plainToInstance(Message, dto, {
      excludeExtraneousValues: true,
    });
  }

  static toResponseDto(message: Message): ResponseMessageDto {
    return plainToInstance(
      ResponseMessageDto,
      {
        ...message,
        senderId: message.sender?.id,
        toId: message.to?.id,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
