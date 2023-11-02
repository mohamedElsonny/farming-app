/*
  Warnings:

  - Added the required column `type` to the `offer_conditions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OfferConditionTypeEnum" AS ENUM ('Benefit', 'Demand');

-- AlterTable
ALTER TABLE "offer_conditions" ADD COLUMN     "type" "OfferConditionTypeEnum" NOT NULL;
