import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from 'src/utils/auth/hash-service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserMapper } from 'src/utils/mappers/user.mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HashService, UserMapper],
  exports: [UsersService], // Exporta o UsersService para que possa ser usado em outros módulos
  imports: [TypeOrmModule.forFeature([User])], // Importa o módulo TypeOrmModule com a entidade User para criar no banco de dados
})
export class UsersModule {}
