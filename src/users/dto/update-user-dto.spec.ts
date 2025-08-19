import { validate } from "class-validator";
import { UpdateUserDto } from "./update-user.dto";

describe("UpdateUserDto", () => {
  it("should be valid with all required fields", async () => {
    const dto = new UpdateUserDto();
    dto.name = "Jane";
    dto.email = "jane@example.com";
    dto.password = "123456";
    dto.routePolicies = ["createMessage", "findOneMessage"] as any;

    const errors = await validate(dto);
    if (errors.length > 0) {
      console.error("TESTE:", errors);
    }
    expect(errors.length).toBe(0);
  });

  it("should be invalid with missing required fields", async () => {
    const dto = new UpdateUserDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
