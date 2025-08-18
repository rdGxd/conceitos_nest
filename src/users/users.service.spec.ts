import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
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

  test("Deve estar definido", () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(hashingService).toBeDefined();
    expect(userMapper).toBeDefined();
  });

  describe("Create", () => {
    test("Deve criar um novo usuário", async () => {
      // Arrange
      const createUserDTo: CreateUserDto = {
        email: "test@example.com",
        password: "password",
        name: "Test User",
      };
      jest.spyOn(hashingService, "hash").mockResolvedValue("hashedPassword");

      // Act
      await userService.create(createUserDTo);

      // Assert
      expect(hashingService.hash).toHaveBeenCalledWith(createUserDTo.password);
      expect(userRepository.create).toHaveBeenCalledWith({
        email: createUserDTo.email,
        name: createUserDTo.name,
        password: "hashedPassword",
      });
    });
  });
});
