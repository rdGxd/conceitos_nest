import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { CreateMessageDto } from "./create-message.dto";

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiProperty({
    description: "Define se a mensagem foi lida",
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  readonly isRead?: boolean;
}
