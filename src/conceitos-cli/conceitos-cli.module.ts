import { Module } from '@nestjs/common';
import { ConceitosCliController } from './conceitos-cli.controller';

@Module({
  imports: [],
  controllers: [ConceitosCliController],
  providers: [],
  exports: [],
})
export class ConceitosCliModule {}
