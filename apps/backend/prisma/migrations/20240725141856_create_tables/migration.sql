-- CreateTable
CREATE TABLE "profissional" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL,

    CONSTRAINT "profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "slotCount" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" SERIAL NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppointmentToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profissional_name_key" ON "profissional"("name");

-- CreateIndex
CREATE UNIQUE INDEX "servico_name_key" ON "servico"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentToService_AB_unique" ON "_AppointmentToService"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentToService_B_index" ON "_AppointmentToService"("B");

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToService" ADD CONSTRAINT "_AppointmentToService_A_fkey" FOREIGN KEY ("A") REFERENCES "agendamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToService" ADD CONSTRAINT "_AppointmentToService_B_fkey" FOREIGN KEY ("B") REFERENCES "servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
