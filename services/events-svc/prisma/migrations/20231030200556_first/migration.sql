-- CreateEnum
CREATE TYPE "EventStatusEnum" AS ENUM ('Pending', 'Received');

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "service" TEXT NOT NULL,
    "status" "EventStatusEnum" NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
