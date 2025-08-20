import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/module/users.module";
import { MessagesController } from "../controller/messages.controller";
import { Message } from "../entities/message.entity";
import { MessagesService } from "../service/messages.service";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  // Exporta o MessagesService para que possa ser usado em outros módulos
  exports: [MessagesService],
  // Importa o módulo TypeOrmModule com a entidade Message para criar no banco de dados e o UsersModule para acessar os usuários
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
})
export class MessagesModule {}
