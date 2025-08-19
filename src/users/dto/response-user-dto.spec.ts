import { validate } from "class-validator";
import { ResponseUserDto } from "./response-user.dto";

describe("ResponseUserDto", () => {
  it("should create an instance with all properties", () => {
    const dto = new ResponseUserDto();
    dto.id = "12345";
    dto.name = "John Doe";
    dto.email = "john.doe@example.com";
    dto.createdAt = new Date("2022-01-01T00:00:00Z");
    dto.updatedAt = new Date("2022-01-01T00:00:00Z");
    dto.routePolicies = ["createMessage", "findOneMessage"] as any;
    dto.picture = "user_picture.png";

    expect(dto.id).toBe("12345");
    expect(dto.name).toBe("John Doe");
    expect(dto.email).toBe("john.doe@example.com");
    expect(dto.createdAt).toEqual(new Date("2022-01-01T00:00:00Z"));
    expect(dto.updatedAt).toEqual(new Date("2022-01-01T00:00:00Z"));
    expect(dto.routePolicies).toEqual(["createMessage", "findOneMessage"]);
    expect(dto.picture).toBe("user_picture.png");
  });

  it("should error if required properties are missing", async () => {
    const dto = new ResponseUserDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
