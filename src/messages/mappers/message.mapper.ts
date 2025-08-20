import { plainToInstance } from "class-transformer";
import { ResponseMessageDto } from "src/messages/dto/response-message.dto";
import { Message } from "src/messages/entities/message.entity";
import { User } from "src/users/entities/user.entity";

export class MessageMapper {
  static toEntity(text: string, sender: User, to: User): Message {
    const messageEntity = new Message();
    messageEntity.text = text;
    messageEntity.sender = sender;
    messageEntity.to = to;
    return messageEntity;
  }

  static toResponseDto(message: Message): ResponseMessageDto {
    return plainToInstance(ResponseMessageDto, message, {
      excludeExtraneousValues: true,
    });
  }
}
