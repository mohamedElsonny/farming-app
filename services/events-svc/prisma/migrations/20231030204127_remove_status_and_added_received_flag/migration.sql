/*
  Warnings:

  - You are about to drop the column `status` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "status",
ADD COLUMN     "received" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "EventStatusEnum";
