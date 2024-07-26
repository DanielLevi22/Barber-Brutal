/*
  Warnings:

  - You are about to drop the column `rating` on the `profissional` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `profissional` table. All the data in the column will be lost.
  - Added the required column `available` to the `profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityAvailable` to the `profissional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profissional" DROP COLUMN "rating",
DROP COLUMN "reviewCount",
ADD COLUMN     "available" INTEGER NOT NULL,
ADD COLUMN     "quantityAvailable" INTEGER NOT NULL;
