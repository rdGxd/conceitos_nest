import { Module } from '@nestjs/common';
import { RecadosModule } from './recados/recados.module';

@Module({
  imports: [RecadosModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
