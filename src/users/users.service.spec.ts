import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashingServiceProtocol } from "../auth";
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
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: HashingServiceProtocol, useValue: {} },
        { provide: UserMapper, useValue: {} },
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
    test("Deve criar um novo usuário", () => {
      // createUserDTO
      // Hashing service tenha o método hash
      // Saber se o hashing service foi chamado com o create pessoa dto
      // Saber se o userRepository.create foi chamado com os dados do user
      // Saber se o userRepository.save foi chamado com os dados do user
      // O retorno final deve ser o user criado
    });
  });
});
