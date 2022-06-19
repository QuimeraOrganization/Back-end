/*
  Warnings:

  - You are about to drop the column `create_at` on the `CategoriesOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `CategoriesOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `IngredientsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `IngredientsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoriesOnProducts" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "IngredientsOnProducts" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "brand" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
