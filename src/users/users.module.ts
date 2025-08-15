import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HashService } from 'src/common/services/hash.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMapper, HashService],
  exports: [UsersService], // Exporta o UsersService para que possa ser usado em outros módulos
  imports: [TypeOrmModule.forFeature([User])], // Importa o módulo TypeOrmModule com a entidade User para criar no banco de dados
})
export class UsersModule {}
