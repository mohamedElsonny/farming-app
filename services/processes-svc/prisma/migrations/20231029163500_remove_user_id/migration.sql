/*
  Warnings:

  - You are about to drop the column `userId` on the `processes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "processes" DROP CONSTRAINT "processes_userId_fkey";

-- AlterTable
ALTER TABLE "processes" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
