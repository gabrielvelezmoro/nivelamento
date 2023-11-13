-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "recipientAddressId" INTEGER;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "recipientAddressId" INTEGER;

-- CreateTable
CREATE TABLE "RecipientAddress" (
    "id" SERIAL NOT NULL,
    "id_address" INTEGER NOT NULL,
    "id_recipient" INTEGER,

    CONSTRAINT "RecipientAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecipientAddress" ADD CONSTRAINT "RecipientAddress_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientAddress" ADD CONSTRAINT "RecipientAddress_id_recipient_fkey" FOREIGN KEY ("id_recipient") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_recipientAddressId_fkey" FOREIGN KEY ("recipientAddressId") REFERENCES "RecipientAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_recipientAddressId_fkey" FOREIGN KEY ("recipientAddressId") REFERENCES "RecipientAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
