import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';

export class UserMapper {
  static async toEntity(dto: CreateUserDto): Promise<User> {
    return plainToInstance(User, dto);
  }

  static toResponseDto(entity: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
