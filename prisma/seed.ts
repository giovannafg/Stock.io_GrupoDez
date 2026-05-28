import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

async function main() {

  // Categorias principais
  await Promise.all([
    prisma.categorias.upsert({ where: { id: 1 }, update: {}, create: { id: 1, nome: 'Mercado' } }),
    prisma.categorias.upsert({ where: { id: 2 }, update: {}, create: { id: 2, nome: 'Farmácia' } }),
    prisma.categorias.upsert({ where: { id: 3 }, update: {}, create: { id: 3, nome: 'Beleza' } }),
    prisma.categorias.upsert({ where: { id: 4 }, update: {}, create: { id: 4, nome: 'Moda' } }),
    prisma.categorias.upsert({ where: { id: 5 }, update: {}, create: { id: 5, nome: 'Eletrônicos' } }),
    prisma.categorias.upsert({ where: { id: 6 }, update: {}, create: { id: 6, nome: 'Jogos' } }),
    prisma.categorias.upsert({ where: { id: 7 }, update: {}, create: { id: 7, nome: 'Brinquedos' } }),
    prisma.categorias.upsert({ where: { id: 8 }, update: {}, create: { id: 8, nome: 'Casa' } }),
  ])

  // Subcategorias de Eletrônicos (categoria_pai_id: 5)
  await Promise.all([
    prisma.categorias.upsert({ where: { id: 9  }, update: {}, create: { id: 9,  nome: 'Celulares',  categoria_pai_id: 5 } }),
    prisma.categorias.upsert({ where: { id: 10 }, update: {}, create: { id: 10, nome: 'Notebooks',  categoria_pai_id: 5 } }),
    prisma.categorias.upsert({ where: { id: 11 }, update: {}, create: { id: 11, nome: 'TVs',        categoria_pai_id: 5 } }),
    prisma.categorias.upsert({ where: { id: 12 }, update: {}, create: { id: 12, nome: 'Acessórios', categoria_pai_id: 5 } }),
  ])

  // Subcategorias de Jogos (categoria_pai_id: 6)
  await Promise.all([
    prisma.categorias.upsert({ where: { id: 13 }, update: {}, create: { id: 13, nome: 'Consoles',   categoria_pai_id: 6 } }),
    prisma.categorias.upsert({ where: { id: 14 }, update: {}, create: { id: 14, nome: 'Periféricos', categoria_pai_id: 6 } }),
  ])

  console.log('✅ Categorias criadas')

  // Lojas (usuarioId: 1 — ajusta para um id que existe no seu banco)
  await Promise.all([
    prisma.lojas.upsert({ where: { id: 1 }, update: {}, create: { id: 1, nome: 'Cjr',  usuarioId: 1, descricao: 'Loja de eletrônicos',  logo_url: '/lojas/loja1.svg' } }),
    prisma.lojas.upsert({ where: { id: 2 }, update: {}, create: { id: 2, nome: 'GadgetShop', usuarioId: 1, descricao: 'Gadgets e acessórios', logo_url: '/lojas/loja2.png' } }),
    prisma.lojas.upsert({ where: { id: 3 }, update: {}, create: { id: 3, nome: 'MegaTech',   usuarioId: 1, descricao: 'Tecnologia em geral',  logo_url: '/lojas/loja3.png' } }),
    prisma.lojas.upsert({ where: { id: 4 }, update: {}, create: { id: 4, nome: 'FashionHub', usuarioId: 1, descricao: 'Moda e estilo',        logo_url: '/lojas/loja4.png' } }),
    prisma.lojas.upsert({ where: { id: 5 }, update: {}, create: { id: 5, nome: 'BeautyShop', usuarioId: 1, descricao: 'Produtos de beleza',   logo_url: '/lojas/loja5.png' } }),
  ])

  console.log('✅ Lojas criadas')

  // Produtos
  await Promise.all([
    // Celulares (categoria_id: 9)
    prisma.produtos.upsert({ where: { id: 1  }, update: {}, create: { id: 1,  loja_id: 1, categoria_id: 9,  nome: 'Iphone 15',       descricao: 'Apple Iphone 15',          preco: 4769.10,  estoque: 3 } }),
    prisma.produtos.upsert({ where: { id: 2  }, update: {}, create: { id: 2,  loja_id: 1, categoria_id: 9,  nome: 'Iphone 16',       descricao: 'Apple Iphone 16',          preco: 5999.99,  estoque: 0 } }),
    prisma.produtos.upsert({ where: { id: 4  }, update: {}, create: { id: 4,  loja_id: 2, categoria_id: 9,  nome: 'S25 Ultra',       descricao: 'Samsung Galaxy S25 Ultra', preco: 5769.10,  estoque: 2 } }),

    // Notebooks (categoria_id: 10)
    prisma.produtos.upsert({ where: { id: 5  }, update: {}, create: { id: 5,  loja_id: 1, categoria_id: 10, nome: 'Macbook Air',     descricao: 'Apple Macbook Air M2',     preco: 15899.99, estoque: 4 } }),
    prisma.produtos.upsert({ where: { id: 6  }, update: {}, create: { id: 6,  loja_id: 3, categoria_id: 10, nome: 'Comp. Lenovo',    descricao: 'Lenovo IdeaPad',           preco: 3899.99,  estoque: 5 } }),
    prisma.produtos.upsert({ where: { id: 7  }, update: {}, create: { id: 7,  loja_id: 3, categoria_id: 10, nome: 'Comp. Samsung',   descricao: 'Samsung Book',             preco: 8549.99,  estoque: 0 } }),

    // TVs (categoria_id: 11)
    prisma.produtos.upsert({ where: { id: 8  }, update: {}, create: { id: 8,  loja_id: 2, categoria_id: 11, nome: 'Smart TV Philips',descricao: 'Philips 55" 4K',           preco: 1229.00,  estoque: 2 } }),
    prisma.produtos.upsert({ where: { id: 9  }, update: {}, create: { id: 9,  loja_id: 3, categoria_id: 11, nome: 'Smart TV Samsung',descricao: 'Samsung 65" QLED',         preco: 3499.00,  estoque: 1 } }),

    // Acessórios (categoria_id: 12)
    prisma.produtos.upsert({ where: { id: 10 }, update: {}, create: { id: 10, loja_id: 1, categoria_id: 12, nome: 'Ipad',            descricao: 'Apple Ipad 10a geração',   preco: 7859.00,  estoque: 2 } }),
    prisma.produtos.upsert({ where: { id: 11 }, update: {}, create: { id: 11, loja_id: 2, categoria_id: 12, nome: 'Headset Gamer',   descricao: 'Headset Gamer RGB',        preco: 899.99,   estoque: 0 } }),
    prisma.produtos.upsert({ where: { id: 12 }, update: {}, create: { id: 12, loja_id: 2, categoria_id: 12, nome: 'Galaxy Buds',     descricao: 'Samsung Galaxy Buds 2',    preco: 699.99,   estoque: 8 } }),
    prisma.produtos.upsert({ where: { id: 13 }, update: {}, create: { id: 13, loja_id: 3, categoria_id: 12, nome: 'Apple Watch',     descricao: 'Apple Watch Series 9',     preco: 3199.99,  estoque: 1 } }),

    // Consoles (categoria_id: 13)
    prisma.produtos.upsert({ where: { id: 14 }, update: {}, create: { id: 14, loja_id: 6, categoria_id: 13, nome: 'Xbox Series X',   descricao: 'Console Xbox Series X',    preco: 3599.99,  estoque: 1 } }),
    prisma.produtos.upsert({ where: { id: 15 }, update: {}, create: { id: 15, loja_id: 6, categoria_id: 13, nome: 'Nintendo Switch 2',descricao: 'Nintendo Switch 2',       preco: 2199.99,  estoque: 3 } }),
    prisma.produtos.upsert({ where: { id: 16 }, update: {}, create: { id: 16, loja_id: 6, categoria_id: 13, nome: 'PS5',             descricao: 'PlayStation 5',            preco: 4299.99,  estoque: 2 } }),

    // Periféricos (categoria_id: 14)
    prisma.produtos.upsert({ where: { id: 17 }, update: {}, create: { id: 17, loja_id: 6, categoria_id: 14, nome: 'JBL Speaker',     descricao: 'Caixa de som JBL',         preco: 599.99,   estoque: 0 } }),

    // Moda (categoria_id: 4)
    prisma.produtos.upsert({ where: { id: 18 }, update: {}, create: { id: 18, loja_id: 4, categoria_id: 4,  nome: 'Tênis Nike',      descricao: 'Nike Air Max',             preco: 799.99,   estoque: 10 } }),
    prisma.produtos.upsert({ where: { id: 19 }, update: {}, create: { id: 19, loja_id: 4, categoria_id: 4,  nome: 'Camiseta Adidas', descricao: 'Camiseta Adidas Originals',preco: 199.99,   estoque: 20 } }),

    // Beleza (categoria_id: 3)
    prisma.produtos.upsert({ where: { id: 20 }, update: {}, create: { id: 20, loja_id: 5, categoria_id: 3,  nome: 'Perfume Chanel',  descricao: 'Chanel N5',                preco: 1299.99,  estoque: 5  } }),
    prisma.produtos.upsert({ where: { id: 21 }, update: {}, create: { id: 21, loja_id: 5, categoria_id: 3,  nome: 'Hidratante',      descricao: 'Hidratante corporal',      preco: 89.99,    estoque: 15 } }),
  ])

  await Promise.all([
    prisma.imagens_produto.upsert({ where: { id: 1 }, update: {}, create: { id: 1, produto_id: 1, url_imagem: '/produtos/iphone15.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 3 }, update: {}, create: { id: 3, produto_id: 2, url_imagem: '/produtos/iphone16.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 4 }, update: {}, create: { id: 4, produto_id: 3, url_imagem: '/produtos/samsung_s25.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 5 }, update: {}, create: { id: 5, produto_id: 4, url_imagem: '/produtos/s25_ultra.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 6 }, update: {}, create: { id: 6, produto_id: 5, url_imagem: '/produtos/macbook_air.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 7 }, update: {}, create: { id: 7, produto_id: 6, url_imagem: '/produtos/lenovo_ideapad.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 8 }, update: {}, create: { id: 8, produto_id: 7, url_imagem: '/produtos/samsung_book.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 9 }, update: {}, create: { id: 9, produto_id: 8, url_imagem: '/produtos/philips_tv.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 10 }, update: {}, create: { id: 10, produto_id: 9, url_imagem: '/produtos/samsung_tv.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 11 }, update: {}, create: { id: 11, produto_id: 10, url_imagem: '/produtos/ipad.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 12 }, update: {}, create: { id: 12, produto_id: 11, url_imagem: '/produtos/headset_gamer.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 13 }, update: {}, create: { id: 13, produto_id: 12, url_imagem: '/produtos/galaxy_buds.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 14 }, update: {}, create: { id: 14, produto_id: 13, url_imagem: '/produtos/apple_watch.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 15 }, update: {}, create: { id: 15, produto_id: 14, url_imagem: '/produtos/xbox_series_x.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 16 }, update: {}, create: { id: 16, produto_id: 15, url_imagem: '/produtos/nintendo_switch_2.png', ordem: 1 } }),
    prisma.imagens_produto.upsert({ where: { id: 17 }, update: {}, create: { id: 17, produto_id: 16, url_imagem: '/produtos/ps5.png', ordem: 1 } }),
  ])

  console.log('✅ Produtos criados')
  console.log('🎉 Seed concluído!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())