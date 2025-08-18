import { Injectable } from "@nestjs/common";
import { IRegexProcessor, RegexProcessorBase } from "./regex-comparison";

/**
 * ✅ Implementação com INTERFACE
 * - Classe limpa, sem herança
 * - Implementa apenas o contrato
 */
@Injectable()
export class RemoveSpaceProcessor implements IRegexProcessor {
  execute(str: string): string {
    return str.replace(/\s+/g, "");
  }

  validate(str: string): boolean {
    return typeof str === "string" && str.length > 0;
  }
}

/**
 * ✅ Implementação com ABSTRACT CLASS
 * - Herda comportamentos base
 * - Aproveita template methods
 */
@Injectable()
export class OnlyLettersProcessor extends RegexProcessorBase {
  // ✅ Só precisa implementar o método abstrato
  execute(str: string): string {
    return str.replace(/[^a-z]/g, "");
  }

  // ✅ Pode sobrescrever validação se necessário
  protected validate(str: string): boolean {
    return super.validate(str) && /[a-z]/.test(str);
  }
}

/**
 * ❌ Implementação HÍBRIDA - quando precisar de ambos
 */
@Injectable()
export class EmailProcessor extends RegexProcessorBase implements IRegexProcessor {
  execute(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
  }

  // ✅ Precisa ser public para satisfazer a interface
  public validate(str: string): boolean {
    return super.validate(str) && str.includes("@");
  }
}
