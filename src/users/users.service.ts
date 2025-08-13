import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HashService } from 'src/utils/auth/hash-service';
import { UserMapper } from 'src/utils/mappers/user.mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly bcryptPassword: HashService,
    private readonly userMapper: UserMapper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userData = await this.userMapper.toEntity(createUserDto);

      const createdUser = this.usersRepository.create(userData);
      const newUser = await this.usersRepository.save(createdUser);

      return this.userMapper.toResponseDto(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já está cadastrado');
      }
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const users = await this.usersRepository.find({
      order: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });
    return users.map((user) => this.userMapper.toResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userMapper.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userData = {
      name: updateUserDto?.name,
      email: updateUserDto?.email,
      password:
        updateUserDto?.password &&
        this.bcryptPassword.hash(updateUserDto.password),
    };

    const user = await this.usersRepository.preload({ id, ...userData });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usersRepository.save(user);
    return this.userMapper.toResponseDto(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const userDto = this.userMapper.toResponseDto(user);
    await this.usersRepository.remove(user);
    return userDto;
  }

  // Método auxiliar para retornar a entidade User (para uso interno)
  async findEntityById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
}
