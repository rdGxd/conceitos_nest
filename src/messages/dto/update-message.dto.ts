import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";
import { CreateMessageDto } from "./create-message.dto";

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  // Adiciona a propriedade isRead como opcional
  @IsBoolean()
  @IsOptional()
  readonly isRead?: boolean;
}
