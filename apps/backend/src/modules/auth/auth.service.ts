import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/prisma.client";
import { env } from "../../config/env";
import { AppError } from "../../common/utils/errors";
import type { RegisterDto } from "./dto/register.dto";
import type { LoginDto } from "./dto/login.dto";
import type { Role } from "@prisma/client";

// ── helpers ───────────────────────────────────────────────────────────────────

function generateAccessToken(payload: { sub: number; email: string; role: Role }) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

function generateRefreshToken(payload: { sub: number }) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });
}

function stripSensitive(user: { passwordHash: string; refreshToken: string | null; [k: string]: unknown }) {
  const { passwordHash: _, refreshToken: __, ...safe } = user;
  return safe;
}

// ── service ───────────────────────────────────────────────────────────────────

export async function registerUser(dto: RegisterDto) {
  const existing = await prisma.user.findUnique({ where: { email: dto.email } });
  if (existing) throw AppError.conflict("Email already in use");

  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);
  const user = await prisma.user.create({
    data: { name: dto.name, email: dto.email, passwordHash, role: dto.role as Role },
  });

  const accessToken = generateAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refreshToken = generateRefreshToken({ sub: user.id });
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  return { user: stripSensitive(user), accessToken, refreshToken };
}

export async function loginUser(dto: LoginDto) {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw AppError.unauthorized("Invalid email or password");

  const valid = await bcrypt.compare(dto.password, user.passwordHash);
  if (!valid) throw AppError.unauthorized("Invalid email or password");

  const accessToken = generateAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refreshToken = generateRefreshToken({ sub: user.id });
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  return { user: stripSensitive(user), accessToken, refreshToken };
}

export async function refreshAccessToken(token: string) {
  let payload: { sub: number };
  try {
    payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: number };
  } catch {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || user.refreshToken !== token) throw AppError.unauthorized("Refresh token revoked");

  return { accessToken: generateAccessToken({ sub: user.id, email: user.email, role: user.role }) };
}

export async function logoutUser(userId: number) {
  await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
}

export async function getMe(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw AppError.notFound("User not found");
  return stripSensitive(user);
}