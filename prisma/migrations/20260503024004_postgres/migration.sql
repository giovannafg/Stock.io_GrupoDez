/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avaliacoes_loja" DROP CONSTRAINT "Avaliacoes_loja_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Avaliacoes_produto" DROP CONSTRAINT "Avaliacoes_produto_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Comentarios_avaliacao" DROP CONSTRAINT "Comentarios_avaliacao_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Lojas" DROP CONSTRAINT "Lojas_usuarioId_fkey";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha_hash" VARCHAR(255) NOT NULL,
    "foto_perfil_url" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lojas" ADD CONSTRAINT "Lojas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_loja" ADD CONSTRAINT "Avaliacoes_loja_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_produto" ADD CONSTRAINT "Avaliacoes_produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_avaliacao" ADD CONSTRAINT "Comentarios_avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
