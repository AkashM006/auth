import bcrypt from "bcrypt";

const generateHash = async (password: string): Promise<string> => {
  const saltRounds = process.env.SALT_ROUNDS ?? 10;

  const result = await bcrypt.hash(password, +saltRounds);

  return result;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export { generateHash, comparePassword };
