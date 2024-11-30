/*
  Warnings:

  - The values [Vegetarian,GlutenFree,NutFree,DairyFree] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Breakfast', 'Vegan', 'Meat', 'Dessert', 'Lunch', 'Chocolate');
ALTER TABLE "Recipe" ALTER COLUMN "categories" TYPE "Category_new"[] USING ("categories"::text::"Category_new"[]);
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "owner" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
