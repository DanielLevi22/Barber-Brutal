/*
  Warnings:

  - You are about to drop the `agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profissional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AppointmentToService" DROP CONSTRAINT "_AppointmentToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToService" DROP CONSTRAINT "_AppointmentToService_B_fkey";

-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_professionalId_fkey";

-- DropTable
DROP TABLE "agendamento";

-- DropTable
DROP TABLE "profissional";

-- DropTable
DROP TABLE "servico";

-- CreateTable
CREATE TABLE "professional" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "available" INTEGER NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,

    CONSTRAINT "professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantitySlots" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professional_name_key" ON "professional"("name");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToService" ADD CONSTRAINT "_AppointmentToService_A_fkey" FOREIGN KEY ("A") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToService" ADD CONSTRAINT "_AppointmentToService_B_fkey" FOREIGN KEY ("B") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
