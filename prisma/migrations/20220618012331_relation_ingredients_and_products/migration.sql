-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "IngredientsOnProducts" (
    "id" SERIAL NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngredientsOnProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IngredientsOnProducts" ADD CONSTRAINT "IngredientsOnProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnProducts" ADD CONSTRAINT "IngredientsOnProducts_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
