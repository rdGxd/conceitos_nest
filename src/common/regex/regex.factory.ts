import { Injectable } from "@nestjs/common";
import { OnlyLettersProcessor, RemoveSpaceProcessor } from "./processors.examples";
import { RegexProtocol } from "./regex.protocol";

export type ClassNames = "RemoveSpaceProcessor" | "OnlyLettersProcessor";

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    // Meu código/lógica
    switch (className) {
      case "RemoveSpaceProcessor":
        return new RemoveSpaceProcessor();
      case "OnlyLettersProcessor":
        return new OnlyLettersProcessor();
      default:
        throw new Error("Unknown processor type");
    }
  }
}
