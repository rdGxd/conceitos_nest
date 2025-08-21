import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs/promises";
import * as path from "path";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { HashingServiceProtocol } from "src/auth/hashing/hashing.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UserMapper } from "src/users/mappers/user.mapper";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly userMapper: UserMapper,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userData = this.userMapper.toEntity(createUserDto);
      userData.password = await this.hashingService.hash(createUserDto.password);

      const createdUser = this.usersRepository.create(userData);
      const newUser = await this.usersRepository.save(createdUser);

      return this.userMapper.toResponseDto(newUser);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Email já está cadastrado");
      }
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const users = await this.usersRepository.find({
      order: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    });
    return users.map((user) => this.userMapper.toResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return this.userMapper.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto, tokenPayloadDto: TokenPayloadDto) {
    const userData = {
      name: updateUserDto.name,
      email: updateUserDto.email,
    };

    if (updateUserDto?.password) {
      userData["password"] = await this.hashingService.hash(updateUserDto.password);
    }

    const user = await this.usersRepository.preload({ id, ...userData });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (user.id !== tokenPayloadDto.sub) {
      throw new ForbiddenException("Você não tem permissão para atualizar este usuário");
    }

    await this.usersRepository.save(user);
    return this.userMapper.toResponseDto(user);
  }

  async remove(id: string, tokenPayloadDto: TokenPayloadDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (user.id !== tokenPayloadDto.sub) {
      throw new ForbiddenException("Você não tem permissão para atualizar este usuário");
    }
    const userDto = this.userMapper.toResponseDto(user);
    await this.usersRepository.remove(user);
    return userDto;
  }


  async uploadPicture(file: Express.Multer.File, tokenPayloadDto: TokenPayloadDto) {
    if (file.size < 1024) {
      throw new BadRequestException("File size is too small");
    }

    const user = await this.findEntityById(tokenPayloadDto.sub);

    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);
    const fileName = `${tokenPayloadDto.sub}.${fileExtension}`;
    const fileFullPath = path.resolve(process.cwd(), "pictures", fileName);
    await fs.writeFile(fileFullPath, file.buffer);
    user.picture = fileName;
    await this.usersRepository.save(user);

    return this.userMapper.toResponseDto(user);
  }

  // * Método auxiliar para retornar a entidade User (para uso interno)
  async findEntityById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user;
  }
}
