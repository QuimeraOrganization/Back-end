-- AlterTable
ALTER TABLE "user" ADD COLUMN     "brand_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
