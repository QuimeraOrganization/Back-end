/*
  Warnings:

  - The `permission` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('USER', 'BRAND', 'ADMIN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "permission",
ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT E'USER';
