import { validate } from "class-validator";
import { CreateUserDto } from "../dto/create-user.dto";

describe("CreateUserDto", () => {
  it("deve validar um DTO válido", async () => {
    const dto = new CreateUserDto();
    dto.email = "test@example.com";
    dto.password = "password";
    dto.name = "Test User";

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("Deve falhar se o email for inválido", async () => {
    const dto = new CreateUserDto();
    dto.email = "";
    dto.password = "password";
    dto.name = "Test User";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("email");
  });

  it("Deve falhar se a senha for inválida", async () => {
    const dto = new CreateUserDto();
    dto.email = "test@example.com";
    dto.password = "";
    dto.name = "Test User";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("password");
  });

  it("Deve falhar se o nome for inválido", async () => {
    const dto = new CreateUserDto();
    dto.email = "test@example.com";
    dto.password = "password";
    dto.name = "";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("name");
  });

  it("should be valid with correct data", async () => {
    const dto = new CreateUserDto();
    dto.name = "John Doe";
    dto.email = "john@example.com";
    dto.password = "12345";
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should be invalid with missing data", async () => {
    const dto = new CreateUserDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
