/*
  Warnings:

  - Added the required column `categoria_id` to the `Lojas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lojas" ADD COLUMN     "categoria_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lojas" ADD CONSTRAINT "Lojas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
