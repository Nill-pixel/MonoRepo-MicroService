-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('INFO', 'WARNING', 'ERROR');

-- CreateTable
CREATE TABLE "Log" (
    "_id" SERIAL NOT NULL,
    "level" "LogLevel" NOT NULL,
    "message" TEXT,
    "details" JSONB NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("_id")
);
