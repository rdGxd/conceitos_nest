import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [MessagesModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
