import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ResponseUserDto } from "src/users/dto/response-user.dto";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class UserMapper {
  toEntity(dto: CreateUserDto): User {
    return plainToInstance(User, dto);
  }

  toResponseDto(entity: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
