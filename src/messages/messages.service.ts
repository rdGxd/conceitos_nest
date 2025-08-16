import
  {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MessageMapper } from 'src/messages/mappers/message.mapper';
import { UsersService } from 'src/users';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    // Injeta o UsersService para poder acessar os usuários
    private readonly usersService: UsersService,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    const { text, toId } = createMessageDto;
    // Verifica se o remetente e o destinatário existem
    const sender = await this.usersService.findEntityById(tokenPayloadDto.sub);
    const to = await this.usersService.findEntityById(toId);

    // Usa o mapper para criar a entidade
    const newMessage = MessageMapper.toEntity(text, sender, to);

    // Cria a mensagem e logo apos isso salva no banco de dados
    const createdMessage = this.messagesRepository.create(newMessage);
    const savedMessage = await this.messagesRepository.save(createdMessage);

    // retorna um DTO da mensagem criada
    return MessageMapper.toResponseDto(savedMessage);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const messages = await this.messagesRepository.find({
      relations: ['sender', 'to'],
      order: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });
    return messages.map((message) => MessageMapper.toResponseDto(message));
  }

  async findOne(id: string) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['sender', 'to'],
    });
    if (!message) return this.throwNotFoundException();

    return MessageMapper.toResponseDto(message);
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['sender', 'to'],
    });
    if (!message) return this.throwNotFoundException();

    if (message.sender.id !== tokenPayloadDto.sub) {
      throw new ForbiddenException('You are not allowed to update this message');
    }

    if (updateMessageDto?.text !== undefined) {
      message.text = updateMessageDto.text;
    }
    if (updateMessageDto?.isRead !== undefined) {
      message.isRead = updateMessageDto.isRead;
    }

    const updatedMessage = await this.messagesRepository.save(message);
    return MessageMapper.toResponseDto(updatedMessage);
  }

  async remove(id: string, tokenPayloadDto: TokenPayloadDto) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['sender', 'to'],
    });
    if (!message) return this.throwNotFoundException();

    if (message.sender.id !== tokenPayloadDto.sub) {
      throw new ForbiddenException(
        'You are not allowed to delete this message',
      );
    }

    const messageDto = MessageMapper.toResponseDto(message);
    await this.messagesRepository.remove(message);
    return messageDto;
  }

  async searchQuery(limite: number, offset: number) {
    const messages = await this.messagesRepository.find({
      skip: offset,
      take: limite,
      relations: ['sender', 'to'],
    });
    return messages.map((message) => MessageMapper.toResponseDto(message));
  }

  throwNotFoundException() {
    // ! throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Message not found');
  }
}
