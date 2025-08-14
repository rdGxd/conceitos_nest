import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { RemoveSpaceRegex } from 'src/common/regex/remove-space.regex';
import { UsersModule } from 'src/users';
import { Message } from './entities/message.entity';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACE_REGEX,
} from './messages.constant';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowercaseLettersRegex,
    },
    {
      provide: REMOVE_SPACE_REGEX,
      useClass: RemoveSpaceRegex,
    },
    RegexFactory,
    {
      provide: REMOVE_SPACE_REGEX, // token
      useFactory: (regexFactory: RegexFactory) => {
        // Meu código/lógica
        return regexFactory.create('RemoveSpaceProcessor');
      }, // Factory
      inject: [RegexFactory], // Injetando na factory na ordem
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX, // token
      useFactory: (regexFactory: RegexFactory) => {
        // Meu código/lógica
        return regexFactory.create('OnlyLettersProcessor');
      }, // Factory
      inject: [RegexFactory], // Injetando na factory na ordem
    },
  ],
  // Exporta o MessagesService para que possa ser usado em outros módulos
  exports: [MessagesService],
  // Importa o módulo TypeOrmModule com a entidade Message para criar no banco de dados e o UsersModule para acessar os usuários
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
})
export class MessagesModule {}
