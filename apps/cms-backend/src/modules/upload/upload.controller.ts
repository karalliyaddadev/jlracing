import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const ALLOWED_PDF_TYPES = ["application/pdf"];

function buildStorage(folder: string) {
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
      cb(null, name);
    },
  });
}

@Controller("upload")
export class UploadController {
  // ── Image upload (hero desktop/mobile, gallery thumbnails, blog images) ──
  @Post("image")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("images"),
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              "Only image files (jpeg, png, webp, avif) are allowed",
            ),
            false,
          );
        }
      },
      limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    }),
  )
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query("site") site?: string,
  ) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/images/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  // ── Video upload (gallery videos, video banner) ──
  @Post("video")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("videos"),
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              "Only video files (mp4, webm, ogg) are allowed",
            ),
            false,
          );
        }
      },
      limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/videos/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  // ── PDF upload (foreign listings) ──
  @Post("pdf")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("pdfs"),
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_PDF_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException("Only PDF files are allowed"), false);
        }
      },
      limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    }),
  )
  uploadPdf(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/pdfs/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  // ── Blog image upload — saves to uploads/local/blog/ ──
  @Post("blog-image")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("local/blog"),
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              "Only image files (jpeg, png, webp, avif) are allowed",
            ),
            false,
          );
        }
      },
      limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    }),
  )
  uploadBlogImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/local/blog/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  // ── Gallery media upload — saves images & videos to uploads/local/gallery/ ──
  @Post("gallery-media")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("local/gallery"),
      fileFilter: (_req, file, cb) => {
        const allowed = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
        if (allowed.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException("Only image or video files are allowed"),
            false,
          );
        }
      },
      limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB (covers videos)
    }),
  )
  uploadGalleryMedia(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/local/gallery/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  // ── Video banner upload — saves to uploads/local/video-banner/ ──
  @Post("video-banner")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("local/video-banner"),
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              "Only video files (mp4, webm, ogg) are allowed",
            ),
            false,
          );
        }
      },
      limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
    }),
  )
  uploadVideoBanner(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/local/video-banner/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  // ── Hero image upload — saves to uploads/local/hero/ ──
  @Post("hero-image")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: buildStorage("local/hero"),
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              "Only image files (jpeg, png, webp, avif) are allowed",
            ),
            false,
          );
        }
      },
      limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    }),
  )
  uploadHeroImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return {
      url: `/uploads/local/hero/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }
}
