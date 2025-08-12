import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';

export class UserMapper {
  static async toEntity(dto: CreateUserDto): Promise<User> {
    const entity = new User();
    entity.name = dto.name;
    entity.email = dto.email;
    entity.passwordHash = await bcrypt.hash(dto.password, 10);
    return entity;
  }

  static toResponseDto(entity: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
