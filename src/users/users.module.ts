import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMapper, HashingServiceProtocol],
  exports: [UsersService], // Exporta o UsersService para que possa ser usado em outros módulos
  imports: [TypeOrmModule.forFeature([User])], // Importa o módulo TypeOrmModule com a entidade User para criar no banco de dados
})
export class UsersModule {}
