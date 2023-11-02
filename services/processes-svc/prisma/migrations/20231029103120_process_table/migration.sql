-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('FARMER', 'PRODUCER');

-- CreateEnum
CREATE TYPE "ProcessStatusEnum" AS ENUM ('Pending', 'Published', 'InProgress', 'Finished');

-- CreateTable
CREATE TABLE "processes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "land_distance" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "status" "ProcessStatusEnum" NOT NULL,

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
