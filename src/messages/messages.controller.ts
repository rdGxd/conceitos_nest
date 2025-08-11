import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // @HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get()
  searchQuery(@Query() pagination: any) {
    const { limite = 10, offset = 0 } = pagination;
    return this.messagesService.searchQuery(+limite, +offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {}
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
