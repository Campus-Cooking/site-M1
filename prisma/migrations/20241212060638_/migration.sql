/*
  Warnings:

  - Made the column `cooktime` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "cooktime" SET NOT NULL;
