/*
  Warnings:

  - Changed the type of `type` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('FARMER', 'PRODUCER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "type" "user_type_enum" NOT NULL;

-- DropEnum
DROP TYPE "UserType";
