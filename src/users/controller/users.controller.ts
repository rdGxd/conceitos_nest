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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SetRoutePolicy } from "src/auth/decorators/set-route-policy.decorator";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { RoutePolicies } from "src/auth/enums/route-policies.enum";
import { AuthAndPolicyGuard } from "src/auth/guards/auth-and-policy.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersService } from "../service/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Cria um novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso." })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Lista todos os usuários" })
  @ApiResponse({ status: 200, description: "Lista de usuários." })
  @ApiBearerAuth()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.findAllUsers)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Busca um usuário pelo ID" })
  @ApiResponse({ status: 200, description: "Usuário encontrado." })
  @ApiBearerAuth()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.findOneUser)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualiza um usuário" })
  @ApiResponse({ status: 200, description: "Usuário atualizado." })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: "Remove um usuário" })
  @ApiResponse({ status: 200, description: "Usuário removido." })
  @ApiBearerAuth()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(RoutePolicies.deleteUser)
  remove(@Param("id") id: string, @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto) {
    return this.usersService.remove(id, tokenPayloadDto);
  }

  @Post("upload-picture")
  @ApiOperation({ summary: "Faz upload da foto do usuário" })
  @ApiResponse({ status: 201, description: "Foto enviada com sucesso." })
  @ApiBearerAuth()
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
