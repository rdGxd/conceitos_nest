import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import globalConfig from "./global.config";

@Module({
  imports: [ConfigModule.forFeature(globalConfig)],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class GlobalConfigModule {}
