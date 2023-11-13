/*
  Warnings:

  - You are about to drop the column `cpf` on the `Recipient` table. All the data in the column will be lost.
  - Added the required column `cep` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "cpf",
ADD COLUMN     "cep" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "id_recipient" INTEGER NOT NULL,
    "id_address" INTEGER NOT NULL,
    "userId" INTEGER,
    "profileId" INTEGER,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "id_postman" INTEGER,
    "id_recipient" INTEGER NOT NULL,
    "id_package" INTEGER,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_id_recipient_fkey" FOREIGN KEY ("id_recipient") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_id_postman_fkey" FOREIGN KEY ("id_postman") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_id_recipient_fkey" FOREIGN KEY ("id_recipient") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_id_package_fkey" FOREIGN KEY ("id_package") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
