-- CreateEnum
CREATE TYPE "MeasureStatus" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'REPROVED');

-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measures" (
    "id" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "consumptionDate" TIMESTAMP(3) NOT NULL,
    "status" "MeasureStatus" NOT NULL,
    "type" "MeasureType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "customersId" TEXT NOT NULL,

    CONSTRAINT "Measures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_code_key" ON "Customers"("code");

-- AddForeignKey
ALTER TABLE "Measures" ADD CONSTRAINT "Measures_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
