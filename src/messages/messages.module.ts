import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';
import { UsersModule } from 'src/users';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  // Exporta o MessagesService para que possa ser usado em outros módulos
  exports: [MessagesService],
  // Importa o módulo TypeOrmModule com a entidade Message para criar no banco de dados e o UsersModule para acessar os usuários
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    MyDynamicModule.register({
      apiKey: 'my-api-key',
      apiUrl: 'https://my-api-url.com',
    }),
  ],
})
export class MessagesModule {}
