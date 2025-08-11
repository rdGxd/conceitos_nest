import { Module } from '@nestjs/common';
import { ConceitosCliModule } from 'src/conceitos-cli/conceitos-cli.module';
import { ConceitosManualModule } from 'src/conceitos-manual/conceitos-manual.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConceitosManualModule, ConceitosCliModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
