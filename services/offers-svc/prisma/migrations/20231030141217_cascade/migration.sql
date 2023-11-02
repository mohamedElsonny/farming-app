-- DropForeignKey
ALTER TABLE "offer_conditions" DROP CONSTRAINT "offer_conditions_offer_id_fkey";

-- AddForeignKey
ALTER TABLE "offer_conditions" ADD CONSTRAINT "offer_conditions_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
