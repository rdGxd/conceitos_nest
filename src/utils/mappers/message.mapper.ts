import { plainToInstance } from 'class-transformer';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ResponseMessageDto } from 'src/messages/dto/response-message.dto';
import { Message } from 'src/messages/entities/message.entity';

export class MessageMapper {
  static toEntity(message: CreateMessageDto): Message {
    return plainToInstance(Message, {
      ...message,
      sender: message.senderId,
      to: message.toId,
    });
  }

  static toResponseDto(message: Message): ResponseMessageDto {
    return plainToInstance(ResponseMessageDto, {
      ...message,
      senderId: message.sender.id,
      toId: message.to.id,
    });
  }
}
