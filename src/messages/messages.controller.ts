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
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseStringUUIDPipe } from 'src/common/pipes/parse-string-uuid.pipe';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.createMessage)
  create(
    @Body() createMessageDto: CreateMessageDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.messagesService.create(createMessageDto, tokenPayloadDto);
  }

  @Get()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.findAllMessages)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.findOneMessage)
  @UsePipes(ParseStringUUIDPipe)
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.updateMessage)
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.messagesService.update(id, updateMessageDto, tokenPayloadDto);
  }

  @Delete(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.deleteMessage)
  remove(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.messagesService.remove(id, tokenPayloadDto);
  }
}
