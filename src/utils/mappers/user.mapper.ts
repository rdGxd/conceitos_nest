import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';
import { HashService } from '../auth/hash-service';

@Injectable()
export class UserMapper {
  constructor(private readonly hashService: HashService) {}

  async toEntity(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.passwordHash = await this.hashService.hash(dto.password);
    return user;
  }

  toResponseDto(entity: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
