import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HashService } from 'src/common/services/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserMapper {
  constructor(private readonly hashService: HashService) {}
  async toEntity(dto: CreateUserDto): Promise<User> {
    const entity = plainToInstance(User, {
      name: dto.name,
      email: dto.email,
      role: dto.role,
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
