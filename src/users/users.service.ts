import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/utils/mappers/user.mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userData = await UserMapper.toEntity(createUserDto);

      const createdUser = this.usersRepository.create(userData);
      const newUser = await this.usersRepository.save(createdUser);

      return UserMapper.toResponseDto(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já está cadastrado');
      }
      throw error;
    }
  }

  async findAll() {
    const users = await this.usersRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
    return users.map((user) => UserMapper.toResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return UserMapper.toResponseDto(user);
  }

  // Método auxiliar para retornar a entidade User (para uso interno)
  async findEntityById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userData = {
      name: updateUserDto?.name,
      email: updateUserDto?.email,
      password:
        updateUserDto?.password && bcrypt.hashSync(updateUserDto.password, 10),
    };

    const user = await this.usersRepository.preload({ id, ...userData });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usersRepository.save(user);
    return UserMapper.toResponseDto(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const userDto = UserMapper.toResponseDto(user);
    await this.usersRepository.remove(user);
    return userDto;
  }
}
