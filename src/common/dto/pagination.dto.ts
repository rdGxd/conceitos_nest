import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
  @ApiProperty({ description: "Limite de itens por página", required: false, default: 10, minimum: 0, maximum: 50 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  @Type(() => Number) // Transforma a string em número
  limit: number = 10;

  @ApiProperty({ description: "Offset para paginação", required: false, default: 0, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;
}
