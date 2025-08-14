/**
 * ✅ INTERFACE - Para contratos puros
 *
 * Vantagens:
 * - Lightweight (não existe em runtime)
 * - Múltiplas implementações fáceis
 * - Type safety puro
 * - Ideal para dependency inversion
 */
export interface IRegexProcessor {
  execute(str: string): string;
  validate(str: string): boolean;
}

/**
 * ❌ ABSTRACT CLASS - Para template methods
 *
 * Vantagens:
 * - Implementação base compartilhada
 * - Injeção direta no DI
 * - Template Method Pattern
 * - Hooks de lifecycle
 */
export abstract class RegexProcessorBase {
  // ✅ Implementação compartilhada
  protected normalizeInput(str: string): string {
    return str?.trim().toLowerCase() || '';
  }

  // ✅ Template method
  public process(str: string): string {
    const normalized = this.normalizeInput(str);
    const validated = this.validate(normalized);

    if (!validated) {
      throw new Error('Input inválido');
    }

    return this.execute(normalized);
  }

  // ✅ Hook methods (podem ser sobrescritos)
  protected validate(str: string): boolean {
    return str.length > 0;
  }

  // ❌ Método abstrato (deve ser implementado)
  abstract execute(str: string): string;
}
