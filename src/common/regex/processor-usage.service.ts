import { Inject, Injectable } from "@nestjs/common";
import type { IRegexProcessor } from "./regex-comparison";
import { RegexProcessorBase } from "./regex-comparison";
import { REGEX_PROCESSOR_TOKEN } from "./regex.module";

@Injectable()
export class ProcessorUsageService {
  constructor(
    // ==================== INTERFACE INJECTION ====================
    // ✅ Interface precisa de @Inject com token
    @Inject(REGEX_PROCESSOR_TOKEN)
    private readonly interfaceProcessor: IRegexProcessor,

    // ==================== ABSTRACT CLASS INJECTION ====================
    // ✅ Abstract class pode ser injetada diretamente
    private readonly abstractProcessor: RegexProcessorBase,

    // ==================== MÚLTIPLAS IMPLEMENTAÇÕES ====================
    @Inject("REMOVE_SPACE_PROCESSOR")
    private readonly spaceProcessor: IRegexProcessor,

    @Inject("EMAIL_PROCESSOR")
    private readonly emailProcessor: IRegexProcessor,
  ) {}

  processWithInterface(text: string): string {
    // ✅ Usa método da interface
    return this.interfaceProcessor.execute(text);
  }

  processWithAbstract(text: string): string {
    // ✅ Usa template method da classe abstrata
    return this.abstractProcessor.process(text); // Inclui validação automática
  }

  processSpecific(text: string): {
    withoutSpaces: string;
    emailFormat: string;
  } {
    return {
      withoutSpaces: this.spaceProcessor.execute(text),
      emailFormat: this.emailProcessor.execute(text),
    };
  }
}
