import {
  BadRequestException,
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
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import type { Request } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { ParseStringUUIDPipe } from 'src/common/pipes/parse-string-uuid.pipe';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
// @UseInterceptors(AuthTokenInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  // findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
  findAll(@Query() paginationDto: PaginationDto) {
    throw new BadRequestException('Erro ao buscar mensagens');
    // return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  // Para o método
  @UsePipes(ParseStringUUIDPipe)
  findOne(@Param('id' /*ParseIntPipe*/) id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
