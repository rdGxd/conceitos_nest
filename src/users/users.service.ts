import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      const userData = {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
      };

      const newUser = this.usersRepository.create(userData);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já está cadastrado');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.usersRepository.find({
      order: {
        id: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.usersRepository.remove(user);
  }
}
