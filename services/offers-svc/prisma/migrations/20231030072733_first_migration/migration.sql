-- CreateEnum
CREATE TYPE "offer_status_enum" AS ENUM ('Pending', 'Accepted', 'Declined', 'Finished');

-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('FARMER', 'PRODUCER');

-- CreateEnum
CREATE TYPE "process_status_enum" AS ENUM ('Pending', 'Published', 'InProgress', 'Finished');

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "status" "offer_status_enum" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_conditions" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "offer_id" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offer_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "user_type_enum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processes" (
    "id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "status" "process_status_enum" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offer_conditions" ADD CONSTRAINT "offer_conditions_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
