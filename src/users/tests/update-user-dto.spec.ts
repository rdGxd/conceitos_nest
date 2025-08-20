import { validate } from "class-validator";
import { UpdateUserDto } from "../dto/update-user.dto";

describe("UpdateUserDto", () => {
  it("should be valid with all required fields", async () => {
    const dto = new UpdateUserDto();
    dto.name = "Jane";
    dto.email = "jane@example.com";
    dto.password = "123456";

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});
