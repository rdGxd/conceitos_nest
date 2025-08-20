import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import path from "path";
import { AuthModule } from "src/auth/auth.module";
import { GlobalConfigModule } from "src/config/global/global-config.module";
import { globalPipes } from "src/config/global/global-pipes.config";
import { typeOrmAsyncConfig } from "src/config/global/global-typeorm.config";
import { MessagesModule } from "src/messages/messages.module";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersModule } from "src/users/users.module";
import request from "supertest";

describe("UserController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.test" }),
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
    globalPipes(app);

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

  const login = async (email: string, password: string, app: INestApplication) => {
    const { body } = await request(app.getHttpServer()).post("/auth/login").send({ email, password });

    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();

    return { ...body };
  };

  const createUserAndLogin = async (app: INestApplication) => {
    const dto = createUser();
    const { body } = await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.CREATED);
    const { refreshToken, accessToken } = await login(dto.email, dto.password, app);
    return {
      refreshToken,
      accessToken,
      user: { ...body },
    };
  };

  describe("/users (POST)", () => {
    it("✅ Deve criar uma pessoa com sucesso", async () => {
      const dto = createUser();

      const { body } = await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.CREATED);

      expect(body).toStrictEqual({
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

      expect(body).toStrictEqual({ error: "Conflict", message: "Email já está cadastrado", statusCode: 409 });
    });

    it("🚫 Deve gerar um erro se a senha for curta", async () => {
      const dto = createUser({ password: "1" });

      const { body } = await request(app.getHttpServer()).post("/users").send(dto).expect(HttpStatus.BAD_REQUEST);
      expect(body).toStrictEqual({
        error: "Bad Request",
        message: ["password must be longer than or equal to 5 characters"],
        statusCode: 400,
      });
    });
  });

  describe("/users/:id (GET)", () => {
    it("✅ Deve retornar uma pessoa com sucesso", async () => {
      // Criando uma pessoa e logando
      const userLogin = await createUserAndLogin(app);

      // Buscando a pessoa criada com o token
      const response = await request(app.getHttpServer())
        .get(`/users/${userLogin.user.id}`)
        .set("Authorization", `Bearer ${userLogin.accessToken}`)
        .expect(HttpStatus.OK);

      expect(userLogin.accessToken).toBeDefined();
      expect(userLogin.refreshToken).toBeDefined();
      expect(response.body).toStrictEqual(userLogin.user);
    });

    it("Deve retornar um erro se a pessoa nao estiver logada", async () => {
      const userLogin = await createUserAndLogin(app);

      const { body } = await request(app.getHttpServer())
        .get(`/users/${userLogin.user.id}`)
        .expect(HttpStatus.UNAUTHORIZED);

      expect(body).toStrictEqual({
        message: "Não logado",
        error: "Unauthorized",
        statusCode: 401,
      });
    });
  });

  describe("PATCH /users/:id", () => {
    it("deve atualizar uma pessoa", async () => {
      const createResponse = await createUserAndLogin(app);

      const personId = createResponse.user.id;

      const updateResponse = await request(app.getHttpServer())
        .patch(`/users/${personId}`)
        .send({
          name: "Luiz Atualizado",
        })
        .set("Authorization", `Bearer ${createResponse.accessToken}`)
        .expect(HttpStatus.OK);

      expect(updateResponse.body).toEqual(
        expect.objectContaining({
          id: personId,
          name: "Luiz Atualizado",
        }),
      );
    });

    it("deve retornar erro para pessoa não encontrada", async () => {
      const { accessToken } = await createUserAndLogin(app);

      await request(app.getHttpServer())
        .patch(`/users/${randomUUID()}`) // ID fictício
        .send({
          name: "Name Atualizado",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /users/:id", () => {
    it("deve remover uma pessoa", async () => {
      const userLogin = await createUserAndLogin(app);

      const personId = userLogin.user.id;

      const response = await request(app.getHttpServer())
        .delete(`/users/${personId}`)
        .set("Authorization", `Bearer ${userLogin.accessToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.email).toBe(userLogin.user.email);
    });

    it("deve retornar erro para pessoa não encontrada", async () => {
      const { accessToken } = await createUserAndLogin(app);

      await request(app.getHttpServer())
        .delete(`/users/${randomUUID()}`) // ID fictício
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it("deve criar uma pessoa", async () => {
      const userLogin = await createUserAndLogin(app);

      const updateResponse = await request(app.getHttpServer())
        .patch(`/users/${userLogin.user.id}`)
        .send({
          name: "Luiz Atualizado",
        })
        .set("Authorization", `Bearer ${userLogin.accessToken}`)
        .expect(HttpStatus.OK);

      expect(updateResponse.body).toEqual(
        expect.objectContaining({
          id: userLogin.user.id,
          name: "Luiz Atualizado",
        }),
      );
    });

    it("deve retornar erro para pessoa não encontrada", async () => {
      const { accessToken } = await createUserAndLogin(app);

      await request(app.getHttpServer())
        .patch(`/users/${randomUUID()}`) // ID fictício
        .send({
          name: "Name Atualizado",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /users/:id", () => {
    it("deve remover uma pessoa", async () => {
      const userLogin = await createUserAndLogin(app);

      const personId = userLogin.user.id;

      const response = await request(app.getHttpServer())
        .delete(`/users/${personId}`)
        .set("Authorization", `Bearer ${userLogin.accessToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.email).toBe(userLogin.user.email);
    });

    it("deve retornar erro para pessoa não encontrada", async () => {
      const { accessToken } = await createUserAndLogin(app);

      await request(app.getHttpServer())
        .delete(`/users/${randomUUID()}`) // ID fictício
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
