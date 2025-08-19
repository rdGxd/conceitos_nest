import { registerAs } from "@nestjs/config";
import { typeOrmAsyncConfig } from "./global-typeorm.config";

export default registerAs("globalConfig", () => {
  return {
    typeorm: {
      useFactory: () => typeOrmAsyncConfig,
    },
  };
});
