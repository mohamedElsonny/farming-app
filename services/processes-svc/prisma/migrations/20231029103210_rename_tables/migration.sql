/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `processes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('FARMER', 'PRODUCER');

-- CreateEnum
CREATE TYPE "process_status_enum" AS ENUM ('Pending', 'Published', 'InProgress', 'Finished');

-- AlterTable
ALTER TABLE "processes" DROP COLUMN "status",
ADD COLUMN     "status" "process_status_enum" NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "ProcessStatusEnum";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "user_type_enum" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
