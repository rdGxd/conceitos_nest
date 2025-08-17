import { Module } from "@nestjs/common";
import {
  EmailProcessor,
  OnlyLettersProcessor,
  RemoveSpaceProcessor,
} from "./processors.examples";
import { RegexProcessorBase } from "./regex-comparison";

/**
 * Configuração de DI para Interface vs Abstract Class
 */

// ✅ Token para interface (necessário)
export const REGEX_PROCESSOR_TOKEN = "IRegexProcessor";

@Module({
  providers: [
    // ==================== INTERFACE APPROACH ====================
    // ✅ Interface precisa de token para DI
    {
      provide: REGEX_PROCESSOR_TOKEN,
      useClass: RemoveSpaceProcessor, // ou OnlyLettersProcessor
    },

    // ==================== ABSTRACT CLASS APPROACH ====================
    // ✅ Abstract class pode ser injetada diretamente
    {
      provide: RegexProcessorBase,
      useClass: OnlyLettersProcessor,
    },

    // ==================== MÚLTIPLAS IMPLEMENTAÇÕES ====================
    // ✅ Diferentes tokens para diferentes implementações
    {
      provide: "REMOVE_SPACE_PROCESSOR",
      useClass: RemoveSpaceProcessor,
    },
    {
      provide: "LETTERS_PROCESSOR",
      useClass: OnlyLettersProcessor,
    },
    {
      provide: "EMAIL_PROCESSOR",
      useClass: EmailProcessor,
    },

    // Para uso direto sem DI
    RemoveSpaceProcessor,
    OnlyLettersProcessor,
    EmailProcessor,
  ],
  exports: [
    REGEX_PROCESSOR_TOKEN,
    RegexProcessorBase,
    "REMOVE_SPACE_PROCESSOR",
    "LETTERS_PROCESSOR",
    "EMAIL_PROCESSOR",
    RemoveSpaceProcessor,
    OnlyLettersProcessor,
    EmailProcessor,
  ],
})
export class RegexModule {}
