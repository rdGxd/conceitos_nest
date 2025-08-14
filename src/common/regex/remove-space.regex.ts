import { RegexProtocol } from './regex.protocol';

export class RemoveSpaceRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/\s+/g, '');
  }
}
