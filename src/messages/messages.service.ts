import { Injectable } from '@nestjs/common';
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
    const id = this.lastId++;
    const newMessage: Message = {
      id,
      ...createMessageDto,
      date: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    return this.messages.find((message) => message.id === id);
  }

  searchQuery(limite: number, offset: number) {
    return this.messages.slice(offset, offset + limite);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = this.messages.find((message) => message.id === id);
    if (!message) {
      throw new Error('Message not found');
    }
    Object.assign(message, updateMessageDto);
    return message;
  }

  remove(id: number) {
    const index = this.messages.findIndex((message) => message.id === id);
    if (index === -1) {
      throw new Error('Message not found');
    }
    this.messages.splice(index, 1);
    return { deleted: true };
  }
}
