/*
  Warnings:

  - You are about to drop the `_AppointmentToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AppointmentToService" DROP CONSTRAINT "_AppointmentToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToService" DROP CONSTRAINT "_AppointmentToService_B_fkey";

-- DropTable
DROP TABLE "_AppointmentToService";

-- CreateTable
CREATE TABLE "_ScheduleToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToService_AB_unique" ON "_ScheduleToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToService_B_index" ON "_ScheduleToService"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToService" ADD CONSTRAINT "_ScheduleToService_A_fkey" FOREIGN KEY ("A") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToService" ADD CONSTRAINT "_ScheduleToService_B_fkey" FOREIGN KEY ("B") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
