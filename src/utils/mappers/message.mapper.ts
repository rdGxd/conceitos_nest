import { ResponseMessageDto } from 'src/messages/dto/response-message.dto';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users';

export class MessageMapper {
  static toEntity(text: string, sender: User, to: User): Message {
    const messageEntity = new Message();
    messageEntity.text = text;
    messageEntity.sender = sender;
    messageEntity.to = to;
    return messageEntity;
  }

  static toResponseDto(message: Message): ResponseMessageDto {
    const { sender, to, ...rest } = message;
    const responseDto = new ResponseMessageDto();
    Object.assign(responseDto, rest);
    responseDto.senderId = sender.id;
    responseDto.toId = to.id;
    return responseDto;
  }
}
