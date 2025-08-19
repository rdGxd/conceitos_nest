import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "../controller/users.controller";
import { User } from "../entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMapper],
  exports: [UsersService, TypeOrmModule], // Exporta o UsersService para que possa ser usado em outros módulos
  imports: [TypeOrmModule.forFeature([User])], // Importa o módulo TypeOrmModule com a entidade User para criar no banco de dados
})
export class UsersModule {}
