import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserMapper {
  constructor(private readonly hashService: HashingServiceProtocol) {}
  async toEntity(dto: CreateUserDto): Promise<User> {
    const entity = plainToInstance(User, {
      name: dto.name,
      email: dto.email,
      password: await this.hashService.hash(dto.password),
    });

    return entity;
  }

  toResponseDto(entity: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
