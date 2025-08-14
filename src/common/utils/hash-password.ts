import * as bcrypt from 'bcrypt';

const DEFAULT_SALT_ROUNDS = 12;

export const hashPassword = async (
  password: string,
  saltRounds: number = DEFAULT_SALT_ROUNDS,
): Promise<string> => {
  if (!password || password.length < 6) {
    throw new Error('Password deve ter pelo menos 6 caracteres');
  }

  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!password || !hashedPassword) {
    return false;
  }

  return bcrypt.compare(password, hashedPassword);
};

export const generateSalt = async (
  rounds: number = DEFAULT_SALT_ROUNDS,
): Promise<string> => {
  return bcrypt.genSalt(rounds);
};

// Para validações rápidas
export const isValidHashFormat = (hash: string): boolean => {
  return Boolean(hash && hash.startsWith('$2') && hash.length === 60);
};
