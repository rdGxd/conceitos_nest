import { UsersController } from "./users.controller";

describe("UserControllerController", () => {
  let controller: UsersController;
  let userServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    uploadPicture: jest.fn(),
  };

  beforeEach(async () => {
    controller = new UsersController(userServiceMock as any);
  });

  it("create - deve usar o UserService com o argumento correto", async () => {
    const argument = { key: "value" };
    const expected = { anyKey: "anyValue" };

    jest.spyOn(userServiceMock, "create").mockResolvedValue(expected);

    const result = await controller.create(argument as any);

    expect(result).toEqual(expected);
    expect(userServiceMock.create).toHaveBeenCalledWith(argument);
  });

  it("findAll - deve usar o userService", async () => {
    const expected = { anyKey: "anyValue" };

    jest.spyOn(userServiceMock, "findAll").mockResolvedValue(expected);

    const paginationDto = { limit: 10, offset: 0 };
    const REQUEST_TOKEN_PAYLOAD_KEY = "REQUEST_TOKEN_PAYLOAD_KEY";
    const mockUser = { id: "user-id", email: "test@example.com" };
    const mockRequest = { [REQUEST_TOKEN_PAYLOAD_KEY]: mockUser };
    await controller.findAll(paginationDto as any, mockRequest as any);

    expect(userServiceMock.findAll).toHaveBeenCalled();
  });

  it("findOne", async () => {
    const expected = { anyKey: "anyValue" };

    jest.spyOn(userServiceMock, "findOne").mockResolvedValue(expected);

    const result = await controller.findOne("user-id");

    expect(result).toEqual(expected);
    expect(userServiceMock.findOne).toHaveBeenCalledWith("user-id");
  });

  it("Update", async () => {
    const argument = { key: "value" };
    const expected = { anyKey: "anyValue" };

    jest.spyOn(userServiceMock, "update").mockResolvedValue(expected);

    const mockTokenPayloadDto = { sub: "user-id", routePolicies: [] } as any;
    const result = await controller.update("user-id", argument as any, mockTokenPayloadDto);

    expect(result).toEqual(expected);
    expect(userServiceMock.update).toHaveBeenCalledWith("user-id", argument, mockTokenPayloadDto);
  });

  it("Remove", async () => {
    const expected = { anyKey: "anyValue" };

    jest.spyOn(userServiceMock, "remove").mockResolvedValue(expected);

    const mockTokenPayloadDto = { sub: "user-id", routePolicies: [] } as any;
    const result = await controller.remove("user-id", mockTokenPayloadDto);

    expect(result).toEqual(expected);
    expect(userServiceMock.remove).toHaveBeenCalledWith("user-id", mockTokenPayloadDto);
  });

  it("UploadPicture", async () => {
    const expected = { anyKey: "anyValue" };
    const file = {
      originalname: "newPicture.jpg",
      buffer: Buffer.from("fake image data"),
      size: 2048,
    } as Express.Multer.File;
    const mockTokenPayloadDto = { sub: "user-id", routePolicies: [] } as any;

    jest.spyOn(userServiceMock, "uploadPicture").mockResolvedValue(expected);

    const result = await controller.uploadPicture(file, mockTokenPayloadDto as any);

    expect(result).toEqual(expected);
    expect(userServiceMock.uploadPicture).toHaveBeenCalledWith(file, mockTokenPayloadDto);
  });
});
