import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { ParseStringUUIDPipe } from 'src/common/pipes/parse-string-uuid.pipe';
import type { RegexProtocol } from 'src/common/regex/regex.protocol';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACE_REGEX,
} from './messages.constant';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(REMOVE_SPACE_REGEX)
    private readonly removeSpaceRegex: RegexProtocol,
    @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    private readonly onlyLowercaseLettersRegex: RegexProtocol,
  ) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(this.removeSpaceRegex.execute('   Hello World!   '));
    console.log(this.onlyLowercaseLettersRegex.execute('Hello World!'));
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  @UsePipes(ParseStringUUIDPipe)
  findOne(@Param('id') id: string) {
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
