/*
  Warnings:

  - You are about to drop the column `product_id` on the `brand` table. All the data in the column will be lost.
  - Added the required column `brand_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "brand" DROP CONSTRAINT "brand_product_id_fkey";

-- AlterTable
ALTER TABLE "brand" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
