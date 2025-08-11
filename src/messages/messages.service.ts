import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = this.messagesRepository.create(createMessageDto);
    return await this.messagesRepository.save(newMessage);
  }

  async findAll() {
    return await this.messagesRepository.find();
  }

  async findOne(id: string) {
    const message = await this.messagesRepository.findOne({ where: { id } });
    if (!message) return this.throwNotFoundException();

    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messagesRepository.findOne({ where: { id } });
    if (!message) return this.throwNotFoundException();

    Object.assign(message, updateMessageDto);
    return await this.messagesRepository.save(message);
  }

  async remove(id: string) {
    const message = await this.messagesRepository.findOneBy({ id });
    if (!message) return this.throwNotFoundException();

    await this.messagesRepository.remove(message);
    return message;
  }

  async searchQuery(limite: number, offset: number) {
    return await this.messagesRepository.find({
      skip: offset,
      take: limite,
    });
  }

  throwNotFoundException() {
    // ! throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Message not found');
  }
}
