/*
  Warnings:

  - You are about to drop the `IngredientsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IngredientsOnUsers" DROP CONSTRAINT "IngredientsOnUsers_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsOnUsers" DROP CONSTRAINT "IngredientsOnUsers_user_id_fkey";

-- DropTable
DROP TABLE "IngredientsOnUsers";

-- CreateTable
CREATE TABLE "IngredientsOnUsersAllergic" (
    "id" SERIAL NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngredientsOnUsersAllergic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IngredientsOnUsersAllergic" ADD CONSTRAINT "IngredientsOnUsersAllergic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnUsersAllergic" ADD CONSTRAINT "IngredientsOnUsersAllergic_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
