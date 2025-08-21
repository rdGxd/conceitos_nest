import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
  @ApiProperty({
    example: "Olá, tudo bem?",
    description: "Conteúdo da mensagem a ser enviada.",
    minLength: 5,
    maxLength: 255,
  })
  @IsString({ message: "O texto deve ser uma string" })
  @IsNotEmpty({ message: "O texto é obrigatório" })
  @MinLength(5, { message: "O texto deve ter pelo menos 5 caracteres" })
  @MaxLength(255, { message: "O texto deve ter no máximo 255 caracteres" })
  text: string;

  @ApiProperty({
    example: "b3b8e2e2-1c2d-4e3a-9f2a-123456789abc",
    description: "UUID do destinatário da mensagem.",
    format: "uuid",
  })
  @IsUUID()
  @IsNotEmpty({ message: "O destinatário é obrigatório" })
  toId: string;
}
