import { plainToInstance } from 'class-transformer';
import { ResponseMessageDto } from 'src/messages/dto/response-message.dto';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

export class MessageMapper {
  // Este método não deve usar DTO diretamente, pois precisa das entidades User
  static toEntity(text: string, sender: User, to: User): Message {
    const message = new Message();
    message.text = text;
    message.sender = sender;
    message.to = to;
    message.isRead = false;

    return message;
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
