import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { HashingServiceProtocol } from "../auth";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserMapper } from "./mappers/user.mapper";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let userService: UsersService;
  let userRepository: Repository<User>;
  let hashingService: HashingServiceProtocol;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
        {
          provide: HashingServiceProtocol,
          useValue: { hash: jest.fn(), compare: jest.fn() },
        },
        {
          provide: UserMapper,
          useValue: { toEntity: jest.fn(), toResponseDto: jest.fn() },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    hashingService = module.get<HashingServiceProtocol>(HashingServiceProtocol);
    userMapper = module.get<UserMapper>(UserMapper);
  });

  it("Deve estar definido", () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(hashingService).toBeDefined();
    expect(userMapper).toBeDefined();
  });

  describe("Create", () => {
    it("Deve criar um novo usuário", async () => {
      // Arrange
      const createUserDTo: CreateUserDto = {
        email: "test@example.com",
        password: "password",
        name: "Test User",
      };
      const passwordHash = "hashedPassword";
      const newUser = {
        id: randomUUID(),
        email: "test@example.com",
        password: passwordHash,
        name: "Test User",
      };

      jest.spyOn(hashingService, "hash").mockResolvedValue(passwordHash);
      jest.spyOn(userMapper, "toEntity").mockReturnValue({
        email: createUserDTo.email,
        name: createUserDTo.name,
        password: passwordHash,
      } as User);
      jest.spyOn(userRepository, "create").mockReturnValue(newUser as User);
      jest.spyOn(userRepository, "save").mockResolvedValue(newUser as User);
      jest.spyOn(userMapper, "toResponseDto").mockReturnValue({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      } as any);

      // Act
      await userService.create(createUserDTo);

      // Assert
      // O método hashingService foi chamado com createUserDTo.password
      expect(hashingService.hash).toHaveBeenCalledWith(createUserDTo.password);
      // O método userRepository.create foi chamado com os dados corretos
      expect(userRepository.create).toHaveBeenCalledWith({
        email: createUserDTo.email,
        name: createUserDTo.name,
        password: passwordHash,
      });
      // O método userRepository.save foi chamado com o usuário correto
      expect(userRepository.save).toHaveBeenCalledWith(newUser);
      // O método userMapper.toResponseDto foi chamado com o usuário correto
      expect(userMapper.toResponseDto).toHaveBeenCalledWith(newUser);
    });

    it("Deve lançar ConflictException quando o email já existe", async () => {
      // Simule que o usuário já existe no banco de dados
      jest.spyOn(userMapper, "toEntity").mockReturnValue({
        email: "existing@example.com",
        name: "teste",
        password: "hashedPassword",
      } as User);
      jest.spyOn(hashingService, "hash").mockResolvedValue("hashedPassword");
      jest.spyOn(userRepository, "create").mockReturnValue({
        email: "existing@example.com",
        name: "teste",
        password: "hashedPassword",
      } as User);
      jest.spyOn(userRepository, "save").mockRejectedValue({
        code: "23505",
      });

      await expect(userService.create({} as any)).rejects.toThrow(ConflictException);
    });
  });
});
