import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Hello World',
      sender: 'John',
      to: 'Jane',
      isRead: false,
      date: new Date(),
    },
  ];

  create(createMessageDto: CreateMessageDto) {
    const newMessage: Message = {
      id: ++this.lastId,
      ...createMessageDto,
      date: new Date(),
      isRead: false,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const message = this.messages.find((message) => message.id === id);
    if (!message) return this.throwNotFoundException();

    return message;
  }

  searchQuery(limite: number, offset: number) {
    return this.messages.slice(offset, offset + limite);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = this.messages.find((message) => message.id === id);
    if (!message) return this.throwNotFoundException();

    Object.assign(message, updateMessageDto);
    return message;
  }

  remove(id: number) {
    const index = this.messages.findIndex((message) => message.id === id);
    if (index === -1) return this.throwNotFoundException();

    this.messages.splice(index, 1);
    return { deleted: true };
  }

  throwNotFoundException() {
    // ! throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Message not found');
  }
}
