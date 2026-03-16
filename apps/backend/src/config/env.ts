import dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env variable: ${key}`);
  return value;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  NODE_ENV: optional("NODE_ENV", "development"),
  PORT: parseInt(optional("PORT", "5000"), 10),

  // Database
  DATABASE_URL: required("DATABASE_URL"),

  // JWT
  JWT_SECRET: optional("JWT_SECRET", "change-me-in-production-please"),
  JWT_EXPIRES_IN: optional("JWT_EXPIRES_IN", "1h"),
  JWT_REFRESH_SECRET: optional("JWT_REFRESH_SECRET", "refresh-change-me-in-production"),
  JWT_REFRESH_EXPIRES_IN: optional("JWT_REFRESH_EXPIRES_IN", "7d"),

  // CORS
  CORS_ORIGIN: optional("CORS_ORIGIN", "http://localhost:3000,http://localhost:3001,http://localhost:3002"),

  // Bcrypt
  BCRYPT_ROUNDS: parseInt(optional("BCRYPT_ROUNDS", "12"), 10),
} as const;
