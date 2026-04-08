import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve uploaded files — uses Express static middleware (no path-to-regexp routing)
  app.useStaticAssets(path.join(process.cwd(), "uploads"), {
    prefix: "/uploads",
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // CORS — allow admin panel and both frontends
  const origins = (
    process.env.CMS_CORS_ORIGIN ||
    "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005"
  )
    .split(",")
    .map((o) => o.trim());

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix("api");

  const port = parseInt(process.env.CMS_PORT || "5001", 10);
  await app.listen(port);
  console.log(`CMS Backend running on http://localhost:${port}/api`);
}

bootstrap();
