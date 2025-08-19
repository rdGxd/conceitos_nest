import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AuthModule } from "src/auth";
import { GlobalConfigModule } from "src/global-config";
import globalConfig from "src/global-config/global.config";
import { MessagesModule } from "src/messages";
import { UsersModule } from "src/users";
import request from "supertest";

describe("UserController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.NODE_ENV = "test";

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        GlobalConfigModule,
        TypeOrmModule.forRootAsync({
          useFactory: globalConfig().typeorm.useFactory,
        }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(process.cwd(), "pictures"),
          serveRoot: "/pictures",
        }),
        UsersModule,
        MessagesModule,
        AuthModule,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(globalConfig().providers as any);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("/users (POST)", () => {
    it("Deve criar uma pessoa com sucesso", async () => {
      const createUserDto = {
        email: "admin@admin.com",
        password: "teste",
        name: "Teste",
      };

      const response = await request(app.getHttpServer()).post("/users").send(createUserDto).expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        email: createUserDto.email,
        name: createUserDto.name,
        picture: "",
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        routePolicies: expect.any(Array),
      });
    });
  });
});
