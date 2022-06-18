-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_product_id_fkey";

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
