/*
  Warnings:

  - You are about to drop the column `role` on the `MosqueMembership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MosqueMembership" DROP COLUMN "role",
ADD COLUMN     "mosqueRole" "MosqueRole" NOT NULL DEFAULT 'VIEWER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;
