-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('rub', 'eu');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('program', 'course');

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sessions" INTEGER NOT NULL,
    "months" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "icon" TEXT NOT NULL,
    "targetAudience" TEXT[],
    "benefits" TEXT[],
    "includes" TEXT[],
    "curriculum" JSONB NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "seoImage" TEXT NOT NULL,
    "seoKeywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorPost" TEXT NOT NULL,
    "desc" TEXT[],
    "targetType" "TargetType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "middlename" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "city" TEXT,
    "info" TEXT[],
    "specializing" TEXT[],
    "certification" TEXT[],
    "principle" TEXT NOT NULL,
    "telegram" TEXT,
    "vk" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);
