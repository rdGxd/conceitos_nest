import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseStringUUIDPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== "param" || metadata.data !== "id") {
      return value;
    }

    const parsedValue = String(value);

    if (
      !parsedValue.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException("ParseStringUUIDPipe: Invalid UUID format");
    }

    return parsedValue;
  }
}
