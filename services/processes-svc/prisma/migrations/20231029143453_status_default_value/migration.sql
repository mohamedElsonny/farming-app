/*
  Warnings:

  - Changed the type of `land_distance` on the `processes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "processes" DROP COLUMN "land_distance",
ADD COLUMN     "land_distance" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending';
