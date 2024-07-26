/*
  Warnings:

  - You are about to drop the column `slotCount` on the `servico` table. All the data in the column will be lost.
  - Added the required column `quantitySlots` to the `servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servico" DROP COLUMN "slotCount",
ADD COLUMN     "quantitySlots" INTEGER NOT NULL;
