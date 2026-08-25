-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('PUBLISHED', 'SCHEDULED', 'DRAFT');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Article" ADD COLUMN "topic" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Article" ADD COLUMN "coverImageAlt" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Article" ADD COLUMN "showCoverOnPost" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Article" ADD COLUMN "schemaMarkup" TEXT;
ALTER TABLE "Article" ADD COLUMN "status" "ArticleStatus" NOT NULL DEFAULT 'PUBLISHED';
ALTER TABLE "Article" ADD COLUMN "publishedAt" TIMESTAMP(3);

UPDATE "Article"
SET "publishedAt" = "createdAt",
    "status" = CASE WHEN "published" THEN 'PUBLISHED'::"ArticleStatus" ELSE 'DRAFT'::"ArticleStatus" END;

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE INDEX "Article_status_publishedAt_idx" ON "Article"("status", "publishedAt");
