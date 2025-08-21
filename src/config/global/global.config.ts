import { registerAs } from "@nestjs/config";
import { typeOrmAsyncConfig } from "./typeorm.config";

export default registerAs("globalConfig", () => {
  return {
    typeorm: {
      useFactory: () => typeOrmAsyncConfig,
    },
  };
});
