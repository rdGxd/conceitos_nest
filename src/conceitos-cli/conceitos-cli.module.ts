import { Module } from '@nestjs/common';
import { ConceitosCliController } from './conceitos-cli.controller';
import { ConceitosCliService } from './conceitos-cli.service';

@Module({
  imports: [],
  controllers: [ConceitosCliController],
  providers: [ConceitosCliService],
  exports: [],
})
export class ConceitosCliModule {}
