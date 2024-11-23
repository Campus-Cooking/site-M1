/*
  Warnings:

  - You are about to drop the `EnrollmentData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EnrollmentData";

-- DropTable
DROP TABLE "StudentData";

-- DropEnum
DROP TYPE "Hobby";

-- DropEnum
DROP TYPE "Level";

-- DropEnum
DROP TYPE "Major";

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
