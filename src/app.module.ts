import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      autoLoadEntities: true, // Ativa o carregamento automático das entidades
      synchronize: true, // Sincroniza o banco de dados com as entidades isso não deve ser usado em produção
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
