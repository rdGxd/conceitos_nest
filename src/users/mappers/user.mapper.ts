import { plainToInstance } from 'class-transformer';
import { hashPassword } from 'src/common/utils/hash-password';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';

export class UserMapper {
  static async toEntity(dto: CreateUserDto): Promise<User> {
    const entity = plainToInstance(User, {
      name: dto.name,
      email: dto.email,
      role: dto.role,
      passwordHash: await hashPassword(dto.password),
    });

    return entity;
  }

  static toResponseDto(entity: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
