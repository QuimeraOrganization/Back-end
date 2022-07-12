-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_user_id_fkey";

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
