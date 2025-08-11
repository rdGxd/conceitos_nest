import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [],
  imports: [TypeOrmModule.forFeature([Message])], // Importa o módulo TypeOrmModule com a entidade Message para criar no banco de dados
})
export class MessagesModule {}
