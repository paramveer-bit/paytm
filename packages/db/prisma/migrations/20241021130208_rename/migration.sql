/*
  Warnings:

  - You are about to drop the column `timestamp` on the `p2pTransfer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startTime` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkId" TEXT;

-- AlterTable
ALTER TABLE "p2pTransfer" DROP COLUMN "timestamp",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
