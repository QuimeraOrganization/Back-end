-- DropForeignKey
ALTER TABLE "brand" DROP CONSTRAINT "brand_product_id_fkey";

-- AddForeignKey
ALTER TABLE "brand" ADD CONSTRAINT "brand_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
