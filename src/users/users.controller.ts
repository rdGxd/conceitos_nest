import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { REQUEST_TOKEN_PAYLOAD_KEY } from "src/auth/constants/auth.constants";
import { SetRoutePolicy } from "src/auth/decorators/set-route-policy.decorator";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { RoutePolicies } from "src/auth/enums/route-policies.enum";
import { AuthAndPolicyGuard } from "src/auth/guards/auth-and-policy.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.findAllUsers)
  findAll(@Query() paginationDto: PaginationDto, @Req() request: Request) {
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];
    console.log(user);
    return this.usersService.findAll(paginationDto);
  }

  @Get(":id")
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.findOneUser)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.updateUser)
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.usersService.update(id, updateUserDto, tokenPayloadDto);
  }

  @Delete(":id")
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.deleteUser)
  remove(@Param("id") id: string, @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto) {
    return this.usersService.remove(id, tokenPayloadDto);
  }

  @Post("upload-picture")
  @UseGuards(AuthAndPolicyGuard)
  @UseInterceptors(FileInterceptor("file"))
  @SetRoutePolicy(RoutePolicies.uploadUser)
  async uploadPicture(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "jpeg|jpg|png|gif|webp",
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.usersService.uploadPicture(file, tokenPayloadDto);
  }
}
