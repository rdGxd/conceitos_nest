import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { ADMIN_POLICIES, HashingServiceProtocol } from "src/auth";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { ResponseUserDto } from "../dto/response-user.dto";
import { User } from "../entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UsersService } from "../users.service";

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
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
            findEntityById: jest.fn(),
            find: jest.fn(),
            preload: jest.fn(),
          },
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

    it("Deve lançar um Error genérico", async () => {
      jest.spyOn(userMapper, "toEntity").mockReturnValue({
        email: "generic@example.com",
        name: "Generic User",
        password: "hashedPassword",
      } as User);
      jest.spyOn(hashingService, "hash").mockResolvedValue("hashedPassword");
      jest.spyOn(userRepository, "create").mockReturnValue({
        email: "generic@example.com",
        name: "Generic User",
        password: "hashedPassword",
      } as User);
      jest.spyOn(userRepository, "save").mockRejectedValue(new Error("Erro genérico"));

      await expect(userService.create({} as any)).rejects.toThrow(new Error("Erro genérico"));
    });
  });

  describe("Find One", () => {
    it("Deve encontrar um usuário pelo ID", async () => {
      // Arrange
      const userId = randomUUID();
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
      } as any;

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);
      jest.spyOn(userMapper, "toResponseDto").mockReturnValue(user);

      // Act
      const result = await userService.findOne(userId);

      // Assert
      expect(result).toEqual(user);
    });

    it("Deve lançar NotFoundException quando o usuário não é encontrado", async () => {
      // Arrange
      const userId = randomUUID();

      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);

      // Act
      await expect(userService.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe("Find All", () => {
    it("Deve retornar uma lista de usuários", async () => {
      // Arrange
      const paginationDto = { limit: 10, offset: 0 };
      const users = [
        {
          id: randomUUID(),
          email: "user1@example.com",
          name: "User 1",
          password: "hashedPassword1",
          sentMessages: [],
          receivedMessages: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          routePolicies: [],
          picture: null,
        } as any,
        {
          id: randomUUID(),
          email: "user2@example.com",
          name: "User 2",
          password: "hashedPassword2",
          sentMessages: [],
          receivedMessages: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          routePolicies: [],
          picture: null,
        } as any,
      ];

      jest.spyOn(userRepository, "find").mockResolvedValue(users);
      jest.spyOn(userMapper, "toResponseDto").mockImplementation((user: any) => user);

      // Act
      const result = await userService.findAll(paginationDto);

      // Assert
      expect(result).toEqual(users);
    });
  });

  describe("Update", () => {
    it("Deve atualizar um usuário existente", async () => {
      // Arrange
      const userId = randomUUID();
      const updateUserDto = {
        email: "updated@example.com",
        name: "Updated User",
        password: "newPassword",
      };
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
      } as User;

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);
      jest.spyOn(userMapper, "toEntity").mockReturnValue({
        ...user,
        ...updateUserDto,
      });
      jest.spyOn(userRepository, "preload").mockResolvedValue({
        ...user,
      });
      jest.spyOn(userRepository, "save").mockResolvedValue({
        ...user,
        ...updateUserDto,
      });
      jest.spyOn(userMapper, "toResponseDto").mockReturnValue({
        ...user,
        ...updateUserDto,
      } as ResponseUserDto);

      // Act
      // Mock token payload to have the same userId or admin privileges
      const tokenPayloadDto = { sub: userId, routePolicies: [...ADMIN_POLICIES] } as any;
      const result = await userService.update(userId, updateUserDto, tokenPayloadDto);

      // Assert
      expect(result).toEqual({
        ...user,
        ...updateUserDto,
      });
    });

    it("Deve lançar NotFoundException quando o usuário não é encontrado", async () => {
      // Arrange
      const userId = randomUUID();
      const updateUserDto = {
        email: "updated@example.com",
        name: "Updated User",
      };

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(null);

      // Act
      const tokenPayloadDto = { sub: userId, routePolicies: [...ADMIN_POLICIES] } as any;
      await expect(userService.update(userId, updateUserDto, tokenPayloadDto)).rejects.toThrow(NotFoundException);
    });

    it("Deve lançar ForbiddenException quando o usuário tenta atualizar outro usuário sem permissão", async () => {
      // Arrange
      const userId = randomUUID();
      const updateUserDto = {
        email: "updated@example.com",
        name: "Updated User",
      };
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
      } as User;

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);
      jest.spyOn(userMapper, "toEntity").mockReturnValue({
        ...user,
        ...updateUserDto,
      });
      jest.spyOn(userRepository, "preload").mockResolvedValue({
        ...user,
      });
      jest.spyOn(userRepository, "save").mockResolvedValue({
        ...user,
        ...updateUserDto,
      });

      // Act
      const tokenPayloadDto = { sub: randomUUID(), routePolicies: [] } as any;
      await expect(userService.update(userId, updateUserDto, tokenPayloadDto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe("Remove", () => {
    it("Deve remover um usuário", async () => {
      // Arrange
      const userId = randomUUID();
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
      } as User;

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);
      jest.spyOn(userRepository, "remove").mockResolvedValue(user);
      jest.spyOn(userMapper, "toResponseDto").mockReturnValue(user as ResponseUserDto);

      // Act
      const tokenPayloadDto = { sub: userId, routePolicies: [...ADMIN_POLICIES] } as any;
      const result = await userService.remove(userId, tokenPayloadDto);

      // Assert
      expect(result).toEqual(user);
    });

    it("Deve lançar um erro quando o usuário não é encontrado", async () => {
      // Arrange
      const userId = randomUUID();

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(null);

      // Act
      const tokenPayloadDto = { sub: userId, routePolicies: [...ADMIN_POLICIES] } as any;
      await expect(userService.remove(userId, tokenPayloadDto)).rejects.toThrow(NotFoundException);
    });

    it("Deve lançar um erro quando um usuário tenta remover outro sem permissão", async () => {
      // Arrange
      const userId = randomUUID();
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
      } as User;

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);

      // Act
      const tokenPayloadDto = { sub: randomUUID(), routePolicies: [] } as any;
      await expect(userService.remove(userId, tokenPayloadDto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe("Upload", () => {
    it("Deve retornar o usuário com o campo picture atualizado", async () => {
      // Arrange
      const userId = randomUUID();
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
        picture: "oldPicture.jpg",
      } as User;

      // Mock file object as Express.Multer.File
      const file = {
        originalname: "newPicture.jpg",
        buffer: Buffer.from("fake image data"),
        size: 2048,
      } as Express.Multer.File;

      // Mock fs and path dependencies
      jest.mock("fs/promises", () => ({
        writeFile: jest.fn().mockResolvedValue(undefined),
      }));
      jest.mock("path", () => ({
        extname: jest.fn((filename) => ".jpg"),
        resolve: jest.fn(() => "/tmp/pictures/newPicture.jpg"),
      }));

      // Mock findEntityById and usersRepository.save
      jest.spyOn(userService as any, "findEntityById").mockResolvedValue(user);
      jest.spyOn(userRepository, "save").mockResolvedValue({
        ...user,
        picture: `${userId}.jpg`,
      });
      jest.spyOn(userMapper, "toResponseDto").mockReturnValue({
        ...user,
        picture: `${userId}.jpg`,
      } as any);

      // Act
      const tokenPayloadDto = { sub: userId, routePolicies: [...ADMIN_POLICIES] } as any;
      const result = await userService.uploadPicture(file, tokenPayloadDto);

      // Assert
      expect(result).toEqual({
        ...user,
        picture: `${userId}.jpg`,
      });
    });

    it("Deve retornar um erro se o tamanho for menor que 1024", async () => {
      // Arrange
      const userId = randomUUID();

      const file = {
        originalname: "smallPicture.jpg",
        buffer: Buffer.from("small"),
        size: 512,
      } as Express.Multer.File;

      // Act
      const tokenPayloadDto = { sub: userId, routePolicies: [...ADMIN_POLICIES] } as any;
      await expect(userService.uploadPicture(file, tokenPayloadDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe("Find Entity By id", () => {
    it("Deve retornar um usuário pelo id", async () => {
      const userId = randomUUID();
      const user = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
      } as User;

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);
      jest.spyOn(userMapper, "toResponseDto").mockReturnValue(user as ResponseUserDto);

      // Act
      const result = await userService.findEntityById(userId);

      // Assert
      expect(result).toEqual(user);
    });

    it("Deve retornar um NotFoundException quando nao encontrar o usuário", async () => {
      const userId = randomUUID();

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(null);

      // Act
      await expect(userService.findEntityById(userId)).rejects.toThrow(NotFoundException);
    });
  });
});
