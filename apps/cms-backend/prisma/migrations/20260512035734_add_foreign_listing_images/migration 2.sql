/*
  Warnings:

  - You are about to drop the column `pdfUrl` on the `foreign_listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "foreign_listings" DROP COLUMN "pdfUrl",
ADD COLUMN     "colour" TEXT,
ADD COLUMN     "condition" TEXT NOT NULL DEFAULT 'used',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "engineCc" INTEGER,
ADD COLUMN     "mileage" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "foreign_listing_images" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foreign_listing_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "foreign_listing_images" ADD CONSTRAINT "foreign_listing_images_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "foreign_listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
