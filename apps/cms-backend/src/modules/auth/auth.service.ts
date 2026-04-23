import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Response } from "express";
import { PrismaService } from "../../common/database/prisma.service";
import { LoginDto } from "./dto/login.dto";

const ACCESS_TTL_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const REFRESH_SECRET =
  process.env.CMS_REFRESH_SECRET || "cms-refresh-secret-change-in-prod";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ── Cookie helpers ──────────────────────────────────────────────────────

  private cookieOpts(maxAge: number, path = "/") {
    return {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path,
    };
  }

  private issueTokens(adminId: number, email: string) {
    const accessToken = this.jwtService.sign(
      { sub: adminId, email },
      { expiresIn: "15m" },
    );
    const refreshToken = this.jwtService.sign(
      { sub: adminId, type: "refresh" },
      { secret: REFRESH_SECRET, expiresIn: "7d" },
    );
    return { accessToken, refreshToken };
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie("access_token", accessToken, this.cookieOpts(ACCESS_TTL_MS));
    res.cookie(
      "refresh_token",
      refreshToken,
      this.cookieOpts(REFRESH_TTL_MS, "/api/auth"),
    );
  }

  // ── Auth actions ────────────────────────────────────────────────────────

  async login(dto: LoginDto, res: Response) {
    const admin = await this.prisma.cmsAdmin.findUnique({
      where: { email: dto.email },
    });

    if (!admin || !admin.isActive)
      throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const { accessToken, refreshToken } = this.issueTokens(
      admin.id,
      admin.email,
    );
    const rtHash = await bcrypt.hash(refreshToken, 10);

    await this.prisma.cmsAdmin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date(), refreshTokenHash: rtHash },
    });

    this.setCookies(res, accessToken, refreshToken);
    return { admin: { id: admin.id, name: admin.name, email: admin.email } };
  }

  async refresh(refreshToken: string | undefined, res: Response) {
    if (!refreshToken) throw new UnauthorizedException("No refresh token");

    let payload: { sub: number; type: string };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    if (payload.type !== "refresh") throw new ForbiddenException();

    const admin = await this.prisma.cmsAdmin.findUnique({
      where: { id: payload.sub },
    });

    if (!admin || !admin.isActive || !admin.refreshTokenHash)
      throw new UnauthorizedException("Session expired — please log in again");

    const valid = await bcrypt.compare(refreshToken, admin.refreshTokenHash);
    if (!valid) throw new UnauthorizedException("Refresh token mismatch");

    // Rotate: issue new pair, store new hash
    const { accessToken, refreshToken: newRT } = this.issueTokens(
      admin.id,
      admin.email,
    );
    const newHash = await bcrypt.hash(newRT, 10);

    await this.prisma.cmsAdmin.update({
      where: { id: admin.id },
      data: { refreshTokenHash: newHash },
    });

    this.setCookies(res, accessToken, newRT);
    return { ok: true };
  }

  async logout(refreshToken: string | undefined, res: Response) {
    // Clear the RT from DB if we can identify the admin
    if (refreshToken) {
      try {
        const payload = this.jwtService.verify<{ sub: number }>(refreshToken, {
          secret: REFRESH_SECRET,
        });
        if (payload?.sub) {
          await this.prisma.cmsAdmin
            .update({
              where: { id: payload.sub },
              data: { refreshTokenHash: null },
            })
            .catch(() => {});
        }
      } catch {
        /* expired or invalid — cookies will still be cleared */
      }
    }

    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/api/auth" });
    return { ok: true };
  }

  async getMe(adminId: number) {
    const admin = await this.prisma.cmsAdmin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        lastLoginAt: true,
      },
    });
    if (!admin) throw new NotFoundException("Admin not found");
    return admin;
  }
}
