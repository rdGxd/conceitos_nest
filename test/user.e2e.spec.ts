import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import request from "supertest";
import { AuthModule } from "src/auth/module/auth.module";
import { GlobalConfigModule } from "src/config/global/global-config.module";
import { globalPipes } from "src/config/global/global-pipes.config";
import { typeOrmAsyncConfig } from "src/config/global/global-typeorm.config";
import { MessagesModule } from "src/messages/module/messages.module";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersModule } from "src/users/module/users.module";

describe("UserController (e2e)", () => {
  let app: INestApplication;

  beforeAll(() => {
    process.env.NODE_ENV = "test";
  });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`.env.test`],
          isGlobal: true,
        }),
        GlobalConfigModule,
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(process.cwd(), "pictures"),
          serveRoot: "/pictures",
        }),
        UsersModule,
        MessagesModule,
        AuthModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(...globalPipes);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const createUser = (overrides?: Partial<CreateUserDto>): CreateUserDto => ({
    email: "admin@admin.com",
    password: "teste",
    name: "Teste",
    ...overrides,
  });

  describe("/users (POST)", () => {
    it("✅ Deve criar uma pessoa com sucesso", async () => {
      const dto = createUser();

      const { body } = await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.CREATED);

      expect(body).toMatchObject({
        email: dto.email,
        name: dto.name,
        picture: "",
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        routePolicies: expect.any(Array),
      });
    });

    it("🚫 Deve gerar um erro se o e-mail já existe", async () => {
      const dto = createUser();

      await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.CREATED);

      const { body } = await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.CONFLICT);

      expect(body).toMatchObject({ error: "Conflict", message: "Email já está cadastrado", statusCode: 409 });
    });

    it("🚫 Deve gerar um erro se a senha for curta", async () => {
      const dto = createUser({ password: "1" });

      const { body } = await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.BAD_REQUEST);
      expect(body).toMatchObject({
        error: "Bad Request",
        message: ["password must be longer than or equal to 5 characters"],
        statusCode: 400,
      });
    });
  });
});
