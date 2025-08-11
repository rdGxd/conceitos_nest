import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: randomUUID(),
      text: 'Hello World',
      sender: 'John',
      to: 'Jane',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(createMessageDto: CreateMessageDto) {
    const newMessage: Message = {
      id: randomUUID(),
      ...createMessageDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isRead: false,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    const message = this.messages.find((message) => message.id === id);
    if (!message) return this.throwNotFoundException();

    return message;
  }

  searchQuery(limite: number, offset: number) {
    return this.messages.slice(offset, offset + limite);
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = this.messages.find((message) => message.id === id);
    if (!message) return this.throwNotFoundException();

    Object.assign(message, updateMessageDto);
    return message;
  }

  remove(id: string) {
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
