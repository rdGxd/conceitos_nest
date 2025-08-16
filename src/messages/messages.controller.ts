import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { RoutePolicies } from 'src/auth/enums/route-policies.enum';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseStringUUIDPipe } from 'src/common/pipes/parse-string-uuid.pipe';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @SetRoutePolicy(RoutePolicies.createMessage)
  @UseGuards(AuthAndPolicyGuard)
  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.messagesService.create(createMessageDto, tokenPayloadDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  @UsePipes(ParseStringUUIDPipe)
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.messagesService.update(id, updateMessageDto, tokenPayloadDto);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.messagesService.remove(id, tokenPayloadDto);
  }
}
