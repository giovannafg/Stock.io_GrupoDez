import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'
import * as bcrypt from 'bcryptjs'


// Para resetar o banco npx prisma migrate reset
// Para rodar a seed npx tsx prisma/seed.ts


const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // ==================== CATEGORIAS PRINCIPAIS ====================
  await Promise.all([
    prisma.categorias.upsert({ where: { id: 1  }, update: {}, create: { id: 1,  nome: 'Mercado'     } }),
    prisma.categorias.upsert({ where: { id: 2  }, update: {}, create: { id: 2,  nome: 'Farmacia'    } }),
    prisma.categorias.upsert({ where: { id: 3  }, update: {}, create: { id: 3,  nome: 'Beleza'      } }),
    prisma.categorias.upsert({ where: { id: 4  }, update: {}, create: { id: 4,  nome: 'Moda'        } }),
    prisma.categorias.upsert({ where: { id: 5  }, update: {}, create: { id: 5,  nome: 'Eletronicos' } }),
    prisma.categorias.upsert({ where: { id: 6  }, update: {}, create: { id: 6,  nome: 'Jogos'       } }),
    prisma.categorias.upsert({ where: { id: 7  }, update: {}, create: { id: 7,  nome: 'Brinquedos'  } }),
    prisma.categorias.upsert({ where: { id: 8  }, update: {}, create: { id: 8,  nome: 'Casa'        } }),
  ])

  // ==================== SUBCATEGORIAS ====================
  await Promise.all([
    // Mercado (1)
    prisma.categorias.upsert({ where: { id: 9  }, update: {}, create: { id: 9,  nome: 'Hortifruti',      categoria_pai_id: 1 } }),
    prisma.categorias.upsert({ where: { id: 10 }, update: {}, create: { id: 10, nome: 'Bebidas',          categoria_pai_id: 1 } }),
    prisma.categorias.upsert({ where: { id: 11 }, update: {}, create: { id: 11, nome: 'Padaria',          categoria_pai_id: 1 } }),
    // Farmácia (2)
    prisma.categorias.upsert({ where: { id: 12 }, update: {}, create: { id: 12, nome: 'Medicamentos',     categoria_pai_id: 2 } }),
    prisma.categorias.upsert({ where: { id: 13 }, update: {}, create: { id: 13, nome: 'Suplementos',      categoria_pai_id: 2 } }),
    prisma.categorias.upsert({ where: { id: 14 }, update: {}, create: { id: 14, nome: 'Higiene',          categoria_pai_id: 2 } }),
    // Beleza (3)
    prisma.categorias.upsert({ where: { id: 15 }, update: {}, create: { id: 15, nome: 'Maquiagem',        categoria_pai_id: 3 } }),
    prisma.categorias.upsert({ where: { id: 16 }, update: {}, create: { id: 16, nome: 'Skincare',         categoria_pai_id: 3 } }),
    prisma.categorias.upsert({ where: { id: 17 }, update: {}, create: { id: 17, nome: 'Perfumes',         categoria_pai_id: 3 } }),
    // Moda (4)
    prisma.categorias.upsert({ where: { id: 18 }, update: {}, create: { id: 18, nome: 'Calçados',         categoria_pai_id: 4 } }),
    prisma.categorias.upsert({ where: { id: 19 }, update: {}, create: { id: 19, nome: 'Roupas',           categoria_pai_id: 4 } }),
    prisma.categorias.upsert({ where: { id: 20 }, update: {}, create: { id: 20, nome: 'Acessórios Moda',  categoria_pai_id: 4 } }),
    // Eletrônicos (5)
    prisma.categorias.upsert({ where: { id: 21 }, update: {}, create: { id: 21, nome: 'Celulares',        categoria_pai_id: 5 } }),
    prisma.categorias.upsert({ where: { id: 22 }, update: {}, create: { id: 22, nome: 'Notebooks',        categoria_pai_id: 5 } }),
    prisma.categorias.upsert({ where: { id: 23 }, update: {}, create: { id: 23, nome: 'TVs',              categoria_pai_id: 5 } }),
    prisma.categorias.upsert({ where: { id: 24 }, update: {}, create: { id: 24, nome: 'Acessórios Tech',  categoria_pai_id: 5 } }),
    // Jogos (6)
    prisma.categorias.upsert({ where: { id: 25 }, update: {}, create: { id: 25, nome: 'Consoles',         categoria_pai_id: 6 } }),
    prisma.categorias.upsert({ where: { id: 26 }, update: {}, create: { id: 26, nome: 'Periféricos',      categoria_pai_id: 6 } }),
    prisma.categorias.upsert({ where: { id: 27 }, update: {}, create: { id: 27, nome: 'Jogos Digitais',   categoria_pai_id: 6 } }),
    // Brinquedos (7)
    prisma.categorias.upsert({ where: { id: 28 }, update: {}, create: { id: 28, nome: 'Educativos',       categoria_pai_id: 7 } }),
    prisma.categorias.upsert({ where: { id: 29 }, update: {}, create: { id: 29, nome: 'Bonecas',          categoria_pai_id: 7 } }),
    prisma.categorias.upsert({ where: { id: 30 }, update: {}, create: { id: 30, nome: 'Eletrônicos Kids', categoria_pai_id: 7 } }),
    // Casa (8)
    prisma.categorias.upsert({ where: { id: 31 }, update: {}, create: { id: 31, nome: 'Decoração',        categoria_pai_id: 8 } }),
    prisma.categorias.upsert({ where: { id: 32 }, update: {}, create: { id: 32, nome: 'Móveis',           categoria_pai_id: 8 } }),
    prisma.categorias.upsert({ where: { id: 33 }, update: {}, create: { id: 33, nome: 'Cozinha',          categoria_pai_id: 8 } }),
  ])
  console.log('✅ Categorias criadas')

  // ==================== USUARIOS ====================
  const senha = await bcrypt.hash('senha123', 10)
  await Promise.all([
    prisma.usuarios.upsert({ where: { id: 1 }, update: {}, create: { id: 1, userName: 'ana_silva',   nome: 'Ana Silva',    email: 'ana@email.com',    senha_hash: senha, foto_perfil_url: '/uploads/fotos-perfil/pessoa1.png' } }),
    prisma.usuarios.upsert({ where: { id: 2 }, update: {}, create: { id: 2, userName: 'carlos_m',    nome: 'Carlos Melo',  email: 'carlos@email.com', senha_hash: senha, foto_perfil_url: '/uploads/fotos-perfil/pessoa2.png' } }),
    prisma.usuarios.upsert({ where: { id: 3 }, update: {}, create: { id: 3, userName: 'julia_r',     nome: 'Julia Ramos',  email: 'julia@email.com',  senha_hash: senha, foto_perfil_url: '/uploads/fotos-perfil/SelenaGomes.png' } }),
    prisma.usuarios.upsert({ where: { id: 4 }, update: {}, create: { id: 4, userName: 'pedro_cost',  nome: 'Pedro Costa',  email: 'pedro@email.com',  senha_hash: senha } }),
    prisma.usuarios.upsert({ where: { id: 5 }, update: {}, create: { id: 5, userName: 'mariana_f',   nome: 'Mariana Faria',email: 'mariana@email.com',senha_hash: senha } }),
  ])
  console.log('✅ Usuários criados')

// ==================== LOJAS ====================
  await Promise.all([
    // Mercado
    prisma.lojas.upsert({ where: { id: 1  }, update: {}, create: { id: 1,  usuarioId: 1, categoria_id: 1, nome: 'BlueBerry Mercado',     descricao: 'Tudo para o seu mercado do dia a dia, com qualidade e preço justo.', logo_url: '/uploads/lojas/BlueBerryMercado.png'     } }),
    prisma.lojas.upsert({ where: { id: 2  }, update: {}, create: { id: 2,  usuarioId: 2, categoria_id: 1, nome: 'CJR Mercado',           descricao: 'Produtos frescos e variados direto para sua casa.',                  logo_url: '/uploads/lojas/cjrMercado.png'           } }),
    prisma.lojas.upsert({ where: { id: 3  }, update: {}, create: { id: 3,  usuarioId: 3, categoria_id: 1, nome: 'Mango Mercado',         descricao: 'Seu mercado de confiança, com entrega rápida e bom atendimento.',     logo_url: '/uploads/lojas/mangoMercado.png'         } }),
    prisma.lojas.upsert({ where: { id: 4  }, update: {}, create: { id: 4,  usuarioId: 4, categoria_id: 1, nome: 'Maumar Mercado',        descricao: 'Variedade de hortifruti, bebidas e padaria em um só lugar.',         logo_url: '/uploads/lojas/maumarMercado.png'        } }),
    prisma.lojas.upsert({ where: { id: 5  }, update: {}, create: { id: 5,  usuarioId: 5, categoria_id: 1, nome: 'Spicy Mercado',         descricao: 'Produtos selecionados para o seu dia a dia, com preços que cabem no bolso.', logo_url: '/uploads/lojas/spicyMercado.png'         } }),
    prisma.lojas.upsert({ where: { id: 6  }, update: {}, create: { id: 6,  usuarioId: 1, categoria_id: 1, nome: 'Dog Goods Mercado',     descricao: 'Mercado completo com foco em qualidade e praticidade.',              logo_url: '/uploads/lojas/dogGoodsMercado.png'      } }),
    // Farmácia
    prisma.lojas.upsert({ where: { id: 7  }, update: {}, create: { id: 7,  usuarioId: 2, categoria_id: 2, nome: 'BeWell Farmácia',       descricao: 'Medicamentos, suplementos e produtos de higiene com entrega rápida.', logo_url: '/uploads/lojas/BeWellFarmacia.png'       } }),
    // Beleza
    prisma.lojas.upsert({ where: { id: 8  }, update: {}, create: { id: 8,  usuarioId: 3, categoria_id: 3, nome: 'Creamy Skincare Beleza',descricao: 'Cuidados para a pele com produtos selecionados e de qualidade.',     logo_url: '/uploads/lojas/CreamySkincareBeleza.png' } }),
    prisma.lojas.upsert({ where: { id: 9  }, update: {}, create: { id: 9,  usuarioId: 4, categoria_id: 3, nome: 'Nalu Beleza',           descricao: 'Skincare e maquiagem para realçar sua beleza natural.',              logo_url: '/uploads/lojas/naluBeleza.png'           } }),
    prisma.lojas.upsert({ where: { id: 10 }, update: {}, create: { id: 10, usuarioId: 5, categoria_id: 3, nome: 'Rare Beauty Beleza',    descricao: 'Maquiagens inclusivas e de alta qualidade para todos os tons de pele.', logo_url: '/uploads/lojas/RareBeatyBeleza.png'      } }),
    prisma.lojas.upsert({ where: { id: 11 }, update: {}, create: { id: 11, usuarioId: 1, categoria_id: 3, nome: 'Roots Beleza',          descricao: 'Produtos de beleza naturais com foco em ingredientes sustentáveis.',  logo_url: '/uploads/lojas/rootsBeleza.png'          } }),
    prisma.lojas.upsert({ where: { id: 12 }, update: {}, create: { id: 12, usuarioId: 2, categoria_id: 3, nome: 'Rose Beleza',           descricao: 'Maquiagem e cuidados pessoais com entrega para todo o Brasil.',       logo_url: '/uploads/lojas/RoseBeleza.png'           } }),
    prisma.lojas.upsert({ where: { id: 13 }, update: {}, create: { id: 13, usuarioId: 3, categoria_id: 3, nome: 'Dcarts Beleza',         descricao: 'Cosméticos selecionados para o seu dia a dia.',                       logo_url: '/uploads/lojas/dcarts&basketsMercado.png'} }),
    // Moda
    prisma.lojas.upsert({ where: { id: 14 }, update: {}, create: { id: 14, usuarioId: 4, categoria_id: 4, nome: 'Amoca Moda',            descricao: 'Roupas e acessórios com estilo para todas as ocasiões.',              logo_url: '/uploads/lojas/AmocaModa.png'            } }),
    prisma.lojas.upsert({ where: { id: 15 }, update: {}, create: { id: 15, usuarioId: 5, categoria_id: 4, nome: 'Amore Casa Moda',       descricao: 'Moda confortável e elegante para o seu dia a dia.',                   logo_url: '/uploads/lojas/AmoreCasa.png'            } }),
    prisma.lojas.upsert({ where: { id: 16 }, update: {}, create: { id: 16, usuarioId: 1, categoria_id: 4, nome: 'Bel Moda',              descricao: 'Tendências de moda com preços acessíveis.',                          logo_url: '/uploads/lojas/belmoda.png'              } }),
    prisma.lojas.upsert({ where: { id: 17 }, update: {}, create: { id: 17, usuarioId: 2, categoria_id: 4, nome: 'Melina Couture Moda',   descricao: 'Peças exclusivas com acabamento refinado.',                          logo_url: '/uploads/lojas/MelinaCoutureModa.png'    } }),
    prisma.lojas.upsert({ where: { id: 18 }, update: {}, create: { id: 18, usuarioId: 3, categoria_id: 4, nome: 'Sneaker Store Moda',    descricao: 'Os melhores tênis e calçados para todos os estilos.',                 logo_url: '/uploads/lojas/sneakerStoreModa.png'     } }),
    // Eletrônicos
    prisma.lojas.upsert({ where: { id: 19 }, update: {}, create: { id: 19, usuarioId: 4, categoria_id: 5, nome: 'Electree Eletrônicos',  descricao: 'TVs, monitores e eletrônicos com garantia e bom preço.',              logo_url: '/uploads/lojas/electreeEletronicos.png'  } }),
    prisma.lojas.upsert({ where: { id: 20 }, update: {}, create: { id: 20, usuarioId: 5, categoria_id: 5, nome: 'Nako Eletrônicos',      descricao: 'Celulares e acessórios tech para todos os gostos.',                   logo_url: '/uploads/lojas/nakoEletronicos.png'      } }),
    prisma.lojas.upsert({ where: { id: 21 }, update: {}, create: { id: 21, usuarioId: 1, categoria_id: 5, nome: 'Repiit Eletrônicos',    descricao: 'Smartphones e acessórios das melhores marcas.',                       logo_url: '/uploads/lojas/repiitEletronicos.png'    } }),
    prisma.lojas.upsert({ where: { id: 22 }, update: {}, create: { id: 22, usuarioId: 2, categoria_id: 5, nome: 'Think Digital',         descricao: 'Notebooks e periféricos para trabalho e estudo.',                     logo_url: '/uploads/lojas/ThinkDigitalEletronicos.png'} }),
    prisma.lojas.upsert({ where: { id: 23 }, update: {}, create: { id: 23, usuarioId: 3, categoria_id: 5, nome: 'Level Up Tecnologia',   descricao: 'Tecnologia de ponta para o seu dia a dia.',                           logo_url: '/uploads/lojas/LevelUpTecnologia.png'    } }),
    // Jogos
    prisma.lojas.upsert({ where: { id: 24 }, update: {}, create: { id: 24, usuarioId: 4, categoria_id: 6, nome: 'Magic Chicken Jogos',   descricao: 'Consoles, jogos e periféricos para gamers de todos os níveis.',       logo_url: '/uploads/lojas/MagicChickenJogos.png'    } }),
    // Brinquedos
    prisma.lojas.upsert({ where: { id: 25 }, update: {}, create: { id: 25, usuarioId: 5, categoria_id: 7, nome: 'Kuby Brinquedos',       descricao: 'Brinquedos educativos e divertidos para todas as idades.',            logo_url: '/uploads/lojas/kubyBrinquedos.png'       } }),
    prisma.lojas.upsert({ where: { id: 26 }, update: {}, create: { id: 26, usuarioId: 1, categoria_id: 7, nome: 'PopIrinc Brinquedos',   descricao: 'Diversão garantida com brinquedos de qualidade.',                     logo_url: '/uploads/lojas/PoplrincBrinquedos.png'   } }),
    // Casa
    prisma.lojas.upsert({ where: { id: 27 }, update: {}, create: { id: 27, usuarioId: 2, categoria_id: 8, nome: 'Fluffy House Casa',     descricao: 'Decoração e itens para deixar sua casa mais aconchegante.',           logo_url: '/uploads/lojas/fluffyHouseCasa.png'      } }),
    prisma.lojas.upsert({ where: { id: 28 }, update: {}, create: { id: 28, usuarioId: 3, categoria_id: 8, nome: 'Mini Reno Casa',        descricao: 'Móveis e itens de cozinha para renovar seu lar.',                     logo_url: '/uploads/lojas/miniRenoCasa.png'         } }),
    prisma.lojas.upsert({ where: { id: 29 }, update: {}, create: { id: 29, usuarioId: 4, categoria_id: 8, nome: 'Whiskers Mercado Casa', descricao: 'Tudo para casa em um só lugar, com qualidade e bom preço.',           logo_url: '/uploads/lojas/WhiskersMercado.png'      } }),
  ])
  console.log('✅ Lojas criadas')
 
  // ==================== PRODUTOS ====================
  const produtos = [
    // Celulares (21)
    { id: 1,  loja_id: 21, categoria_id: 21, nome: 'iPhone 6',          descricao: 'Apple iPhone 6, clássico e funcional.',                    preco: 899.99,   estoque: 5,  imagem: '/uploads/produtos/iphone6.png'         },
    { id: 2,  loja_id: 21, categoria_id: 21, nome: 'iPhone 15',         descricao: 'Apple iPhone 15 com câmera de alta resolução.',            preco: 4769.10,  estoque: 3,  imagem: '/uploads/produtos/iphone15.png'        },
    { id: 3,  loja_id: 20, categoria_id: 21, nome: 'iPhone 16',         descricao: 'O mais novo iPhone, com desempenho e câmera aprimorados.', preco: 5999.99,  estoque: 2,  imagem: '/uploads/produtos/iphone16.png'        },
    { id: 4,  loja_id: 20, categoria_id: 21, nome: 'Samsung S25 Ultra', descricao: 'Samsung Galaxy S25 Ultra, topo de linha com S Pen.',       preco: 5769.10,  estoque: 4,  imagem: '/uploads/produtos/S25Ultra.png'        },
    { id: 5,  loja_id: 22, categoria_id: 21, nome: 'Samsung Z Fold',    descricao: 'Smartphone dobrável da Samsung, tela grande e versátil.', preco: 8999.99,  estoque: 1,  imagem: '/uploads/produtos/samsungzFold.png'    },
    { id: 6,  loja_id: 21, categoria_id: 21, nome: 'iPhone 3',          descricao: 'Modelo retrô do iPhone, ideal para coleção.',              preco: 499.99,   estoque: 4,  imagem: '/uploads/produtos/iphone3.png'         },
    { id: 7,  loja_id: 20, categoria_id: 21, nome: 'iPhone 15 (Roxo)',  descricao: 'Apple iPhone 15 na cor roxa, edição especial.',            preco: 4899.99,  estoque: 3,  imagem: '/uploads/produtos/iphone152.png'       },
    // Notebooks (22)
    { id: 8,  loja_id: 23, categoria_id: 22, nome: 'Macbook',           descricao: 'Apple Macbook Air, leve e potente para o dia a dia.',     preco: 15899.99, estoque: 2,  imagem: '/uploads/produtos/macbook.png'         },
    { id: 9,  loja_id: 22, categoria_id: 22, nome: 'Notebook Lenovo',   descricao: 'Lenovo IdeaPad, ótimo custo-benefício para uso geral.',    preco: 3899.99,  estoque: 5,  imagem: '/uploads/produtos/notebookLenovo.png'  },
    { id: 10, loja_id: 23, categoria_id: 22, nome: 'Samsung Book',      descricao: 'Notebook Samsung Book, design fino e bateria de longa duração.', preco: 4599.99, estoque: 3,  imagem: '/uploads/produtos/samsungbook.png'     },
    { id: 11, loja_id: 23, categoria_id: 22, nome: 'Macbook Pro',       descricao: 'Apple Macbook Pro, ideal para tarefas pesadas e edição.',  preco: 18999.99, estoque: 2,  imagem: '/uploads/produtos/macbook2.png'        },
    { id: 12, loja_id: 22, categoria_id: 22, nome: 'Macbook Air M2',    descricao: 'Apple Macbook Air M2, leveza e performance.',              preco: 13999.99, estoque: 3,  imagem: '/uploads/produtos/macbook3.png'        },
    // TVs (23)
    { id: 13, loja_id: 19, categoria_id: 23, nome: 'TV Samsung 65"',    descricao: 'Smart TV Samsung 65 polegadas com resolução 4K.',         preco: 3499.00,  estoque: 2,  imagem: '/uploads/produtos/TVsamsung65.png'     },
    { id: 14, loja_id: 19, categoria_id: 23, nome: 'TV Samsung 50"',    descricao: 'Smart TV Samsung 50 polegadas, ótima para a sala.',       preco: 1899.00,  estoque: 4,  imagem: '/uploads/produtos/televisao50.png'     },
    { id: 15, loja_id: 22, categoria_id: 23, nome: 'TV LG 43"',         descricao: 'Smart TV LG 43 polegadas, ideal para ambientes pequenos.', preco: 1229.00,  estoque: 3,  imagem: '/uploads/produtos/televisao43LG.png'   },
    { id: 16, loja_id: 19, categoria_id: 23, nome: 'Monitor 24"',       descricao: 'Monitor 24 polegadas Full HD para trabalho e jogos.',     preco: 899.99,   estoque: 6,  imagem: '/uploads/produtos/monitor24.png'       },
    { id: 17, loja_id: 20, categoria_id: 23, nome: 'Monitor 27"',       descricao: 'Monitor 27 polegadas com tela ampla e cores vivas.',      preco: 1299.99,  estoque: 4,  imagem: '/uploads/produtos/monitor27.png'       },
    // Acessórios Tech (24)
    { id: 18, loja_id: 21, categoria_id: 24, nome: 'Earbuds',           descricao: 'Fone de ouvido sem fio com cancelamento de ruído.',       preco: 499.99,   estoque: 8,  imagem: '/uploads/produtos/earbuds.png'         },
    { id: 19, loja_id: 22, categoria_id: 24, nome: 'Headset',           descricao: 'Headset gamer com som surround e microfone destacável.',  preco: 899.99,   estoque: 5,  imagem: '/uploads/produtos/Headset.png'         },
    { id: 20, loja_id: 23, categoria_id: 24, nome: 'Cabo HDMI',         descricao: 'Cabo HDMI de alta velocidade, ideal para TVs e monitores.', preco: 49.99,  estoque: 20, imagem: '/uploads/produtos/caboHDMI.png'        },
    { id: 21, loja_id: 20, categoria_id: 24, nome: 'Mouse Multilaser',  descricao: 'Mouse sem fio com sensor de precisão.',                   preco: 129.99,  estoque: 10, imagem: '/uploads/produtos/mouseMultilaser.png' },
    { id: 22, loja_id: 19, categoria_id: 24, nome: 'Mouse Teclado',     descricao: 'Combo mouse e teclado para escritório e estudo.',         preco: 199.99,   estoque: 7,  imagem: '/uploads/produtos/mouseteclado.png'    },
    { id: 23, loja_id: 21, categoria_id: 24, nome: 'iPad 11"',          descricao: 'Apple iPad 11 polegadas, ideal para estudo e trabalho.',  preco: 4299.99,  estoque: 3,  imagem: '/uploads/produtos/ipad11.png'          },
    { id: 24, loja_id: 20, categoria_id: 24, nome: 'Smartwatch',        descricao: 'Relógio inteligente com monitoramento de saúde.',        preco: 1299.99,  estoque: 4,  imagem: '/uploads/produtos/smartwatch.png'      },
    { id: 25, loja_id: 22, categoria_id: 24, nome: 'JBL',               descricao: 'Caixa de som JBL portátil com som potente.',              preco: 599.99,   estoque: 6,  imagem: '/uploads/produtos/jbl.png'             },
    { id: 26, loja_id: 23, categoria_id: 24, nome: 'SoundBar',          descricao: 'SoundBar para melhorar o áudio da sua TV.',               preco: 899.99,   estoque: 3,  imagem: '/uploads/produtos/SoundBar.png'        },
    { id: 27, loja_id: 22, categoria_id: 24, nome: 'Adaptador Cartão',  descricao: 'Adaptador de cartão de memória SD para notebooks.',      preco: 29.99,    estoque: 15, imagem: '/uploads/produtos/adaptadorcartaosd.png'},
    // Consoles (25)
    { id: 28, loja_id: 24, categoria_id: 25, nome: 'PS5',               descricao: 'Console PlayStation 5, gráficos de última geração.',     preco: 4299.99,  estoque: 2,  imagem: '/uploads/produtos/PS5.png'             },
    { id: 29, loja_id: 24, categoria_id: 25, nome: 'Xbox Series',       descricao: 'Console Xbox Series X com desempenho de alta performance.', preco: 3599.99, estoque: 1,  imagem: '/uploads/produtos/XboxSeries.png'      },
    { id: 30, loja_id: 24, categoria_id: 25, nome: 'Xbox S',            descricao: 'Console Xbox Series S, compacto e acessível.',            preco: 1999.99,  estoque: 3,  imagem: '/uploads/produtos/xboxs.png'           },
    { id: 31, loja_id: 24, categoria_id: 25, nome: 'Nintendo Switch',   descricao: 'Console Nintendo Switch, portátil e versátil.',          preco: 2199.99,  estoque: 4,  imagem: '/uploads/produtos/NintendoSwitch.png'  },
    { id: 32, loja_id: 24, categoria_id: 25, nome: 'Nintendo 3DS',      descricao: 'Console portátil Nintendo 3DS, clássico dos games.',     preco: 899.99,   estoque: 2,  imagem: '/uploads/produtos/nintendo3ds.png'     },
    // Periféricos (26)
    { id: 33, loja_id: 24, categoria_id: 26, nome: 'Volante Gamer',     descricao: 'Volante para simuladores de corrida, com force feedback.', preco: 1499.99, estoque: 3,  imagem: '/uploads/produtos/volante.png'         },
    // Jogos Digitais (27)
    { id: 34, loja_id: 24, categoria_id: 27, nome: 'Zelda',             descricao: 'Jogo Zelda para Nintendo Switch, aventura e exploração.', preco: 299.99,   estoque: 10, imagem: '/uploads/produtos/zeldajogo.png'       },
    // Beleza - Maquiagem (15)
    { id: 35, loja_id: 10, categoria_id: 15, nome: 'Base',              descricao: 'Base líquida de alta cobertura para todos os tons.',     preco: 89.99,    estoque: 15, imagem: '/uploads/produtos/base.png'            },
    { id: 36, loja_id: 10, categoria_id: 15, nome: 'Blush',             descricao: 'Blush em pó com cor duradoura e acabamento natural.',    preco: 69.99,    estoque: 12, imagem: '/uploads/produtos/blush.png'           },
    { id: 37, loja_id: 12, categoria_id: 15, nome: 'Batom Rosa',        descricao: 'Batom matte na cor rosa, longa duração.',                 preco: 49.99,    estoque: 20, imagem: '/uploads/produtos/batomrosa.png'       },
    { id: 38, loja_id: 12, categoria_id: 15, nome: 'Batom Vermelho',    descricao: 'Batom matte vermelho clássico, alta pigmentação.',        preco: 49.99,    estoque: 18, imagem: '/uploads/produtos/batomVermelho.png'   },
    { id: 39, loja_id: 11, categoria_id: 15, nome: 'Bronzer',           descricao: 'Bronzer em pó para um efeito bronzeado natural.',         preco: 79.99,    estoque: 0, imagem: '/uploads/produtos/bronzer.png'         },
    { id: 40, loja_id: 10, categoria_id: 15, nome: 'Contorno',          descricao: 'Paleta de contorno facial para marcar o rosto.',          preco: 59.99,    estoque: 14, imagem: '/uploads/produtos/contorno.png'        },
    { id: 41, loja_id: 13, categoria_id: 15, nome: 'Corretivo',         descricao: 'Corretivo de alta cobertura para imperfeições.',         preco: 39.99,    estoque: 25, imagem: '/uploads/produtos/corretivo.png'       },
    { id: 42, loja_id: 11, categoria_id: 15, nome: 'Delineador',        descricao: 'Delineador líquido de ponta fina, traço preciso.',       preco: 29.99,    estoque: 30, imagem: '/uploads/produtos/delineador.png'      },
    { id: 43, loja_id: 12, categoria_id: 15, nome: 'Iluminador',        descricao: 'Iluminador líquido para um brilho saudável na pele.',     preco: 69.99,    estoque: 16, imagem: '/uploads/produtos/iluminador.png'      },
    { id: 44, loja_id: 10, categoria_id: 15, nome: 'Mascara Cílios',    descricao: 'Máscara para cílios com efeito volumoso.',                preco: 54.99,    estoque: 22, imagem: '/uploads/produtos/MascaraDeCilios.png' },
    { id: 45, loja_id: 13, categoria_id: 15, nome: 'Mini Blush',        descricao: 'Blush compacto, ideal para levar na bolsa.',              preco: 39.99,    estoque: 18, imagem: '/uploads/produtos/MiniBlush.png'       },
    { id: 46, loja_id: 11, categoria_id: 15, nome: 'Paleta Sombras',    descricao: 'Paleta de sombras com cores neutras e vibrantes.',        preco: 99.99,    estoque: 8,  imagem: '/uploads/produtos/paletadesombras.png' },
    { id: 47, loja_id: 12, categoria_id: 15, nome: 'Po Compacto',       descricao: 'Pó compacto matificante para acabamento perfeito.',       preco: 44.99,    estoque: 20, imagem: '/uploads/produtos/poCompacto.png'      },
    { id: 48, loja_id: 10, categoria_id: 15, nome: 'Po',                descricao: 'Pó solto translúcido para finalizar a maquiagem.',        preco: 34.99,    estoque: 25, imagem: '/uploads/produtos/po.png'              },
    { id: 49, loja_id: 13, categoria_id: 15, nome: 'Primer',            descricao: 'Primer facial para prolongar a maquiagem.',              preco: 64.99,    estoque: 15, imagem: '/uploads/produtos/primer.png'          },
    { id: 50, loja_id: 11, categoria_id: 15, nome: 'Primer Bastão',     descricao: 'Primer em bastão, prático e fácil de aplicar.',          preco: 54.99,    estoque: 12, imagem: '/uploads/produtos/primerbastao.png'    },
    { id: 51, loja_id: 12, categoria_id: 15, nome: 'Sombra Rosa',       descricao: 'Sombra individual na cor rosa, alta pigmentação.',        preco: 44.99,    estoque: 18, imagem: '/uploads/produtos/sombrarosa.png'      },
    // Skincare (16)
    { id: 52, loja_id: 8,  categoria_id: 16, nome: 'Bruma Labial',      descricao: 'Bruma hidratante para os lábios.',                        preco: 34.99,    estoque: 20, imagem: '/uploads/produtos/BrumaLabial.png'     },
    { id: 53, loja_id: 8,  categoria_id: 16, nome: 'Creme de Mão',      descricao: 'Creme hidratante para as mãos, fórmula nutritiva.',       preco: 29.99,    estoque: 25, imagem: '/uploads/produtos/cremedemao.png'      },
    { id: 54, loja_id: 9,  categoria_id: 16, nome: 'Creme Rare Beauty',descricao: 'Creme hidratante facial da linha Rare Beauty.',            preco: 89.99,    estoque: 10, imagem: '/uploads/produtos/cremeRareBeaty.png'  },
    { id: 55, loja_id: 8,  categoria_id: 16, nome: 'Gel Banho',         descricao: 'Gel de banho hidratante com fragrância suave.',           preco: 39.99,    estoque: 0, imagem: '/uploads/produtos/geldebanho.png'      },
    { id: 56, loja_id: 9,  categoria_id: 16, nome: 'Gel Perfumado',     descricao: 'Gel corporal perfumado de longa duração.',                preco: 49.99,    estoque: 15, imagem: '/uploads/produtos/GelPerfumado.png'    },
    { id: 57, loja_id: 8,  categoria_id: 16, nome: 'Gloss Marrom',      descricao: 'Gloss labial na cor marrom, brilho intenso.',             preco: 34.99,    estoque: 22, imagem: '/uploads/produtos/glossmarrom.png'     },
    { id: 58, loja_id: 9,  categoria_id: 16, nome: 'Gloss Rare Beauty',descricao: 'Gloss labial hidratante da linha Rare Beauty.',            preco: 44.99,    estoque: 16, imagem: '/uploads/produtos/glossRareBeaty.png'  },
    { id: 59, loja_id: 8,  categoria_id: 16, nome: 'Gloss Vinho',       descricao: 'Gloss labial na cor vinho, acabamento brilhante.',        preco: 34.99,    estoque: 20, imagem: '/uploads/produtos/glossvinh9o.png'     },
    { id: 60, loja_id: 9,  categoria_id: 16, nome: 'Lápis Labial',      descricao: 'Lápis labial de alta fixação, várias cores.',             preco: 24.99,    estoque: 30, imagem: '/uploads/produtos/lapis labial.png'    },
    // Perfumes (17)
    { id: 61, loja_id: 11, categoria_id: 17, nome: 'Perfume Rare Beauty',descricao: 'Perfume floral da linha Rare Beauty, fragrância marcante.', preco: 299.99, estoque: 8,  imagem: '/uploads/produtos/perfumeRare.png'     },
    // Casa - Decoração (31)
    { id: 62, loja_id: 27, categoria_id: 31, nome: 'Vitrola Vintage',   descricao: 'Vitrola estilo retrô para tocar seus discos favoritos.',  preco: 899.99,   estoque: 3,  imagem: '/uploads/produtos/vitrolavintage.png'  },
 
    // ===== NOVOS PRODUTOS =====
 
    // Mercado - Hortifruti (9)
    { id: 63, loja_id: 1,  categoria_id: 9,  nome: 'Alface',           descricao: 'Alface fresca, ideal para saladas.',                      preco: 4.99,     estoque: 30, imagem: '/uploads/produtos/alface.png'          },
    { id: 64, loja_id: 2,  categoria_id: 9,  nome: 'Maçã',             descricao: 'Maçã fresca e crocante, vendida por kg.',                 preco: 8.99,     estoque: 40, imagem: '/uploads/produtos/maca.png'            },
    // Mercado - Bebidas (10)
    { id: 65, loja_id: 3,  categoria_id: 10, nome: 'Suco de Laranja',  descricao: 'Suco de laranja natural, sem conservantes.',              preco: 9.99,     estoque: 25, imagem: '/uploads/produtos/sucodelaranja.png'   },
    // Mercado - Padaria (11)
    { id: 66, loja_id: 4,  categoria_id: 11, nome: 'Pão',              descricao: 'Pão fresquinho, assado diariamente.',                     preco: 12.99,    estoque: 20, imagem: '/uploads/produtos/pao.png'             },
 
    // Farmácia - Medicamentos (12)
    { id: 67, loja_id: 7,  categoria_id: 12, nome: 'Paracetamol',      descricao: 'Analgésico e antitérmico para dores e febre.',            preco: 14.99,    estoque: 50, imagem: '/uploads/produtos/paracetamol.png'     },
    // Farmácia - Suplementos (13)
    { id: 68, loja_id: 7,  categoria_id: 13, nome: 'Creatina',         descricao: 'Suplemento para ganho de massa e desempenho muscular.',   preco: 89.99,    estoque: 15, imagem: '/uploads/produtos/creatina.png'        },
    { id: 69, loja_id: 7,  categoria_id: 13, nome: 'Vitamina C',       descricao: 'Suplemento vitamínico para reforçar a imunidade.',        preco: 29.99,    estoque: 30, imagem: '/uploads/produtos/vitamina c.png'      },
    // Farmácia - Higiene (14)
    { id: 70, loja_id: 7,  categoria_id: 14, nome: 'Shampoo',          descricao: 'Shampoo para limpeza e cuidado diário dos cabelos.',      preco: 19.99,    estoque: 25, imagem: '/uploads/produtos/shampoo.png'         },
    { id: 71, loja_id: 7,  categoria_id: 14, nome: 'Sabonete',         descricao: 'Sabonete em barra com fragrância suave.',                 preco: 4.99,     estoque: 50, imagem: '/uploads/produtos/sabonete.png'        },
 
    // Moda - Calçados (18)
    { id: 72, loja_id: 18, categoria_id: 18, nome: 'Botas',            descricao: 'Botas confortáveis para o dia a dia.',                    preco: 249.99,   estoque: 0, imagem: '/uploads/produtos/botas.png'           },
    { id: 73, loja_id: 18, categoria_id: 18, nome: 'Chinelo',          descricao: 'Chinelo macio e leve, ideal para o verão.',               preco: 39.99,    estoque: 25, imagem: '/uploads/produtos/chinelo.png'         },
    // Moda - Acessórios Moda (20)
    { id: 74, loja_id: 14, categoria_id: 20, nome: 'Boné',             descricao: 'Boné estiloso, protege do sol com conforto.',             preco: 59.99,    estoque: 18, imagem: '/uploads/produtos/bone.png'            },
    { id: 75, loja_id: 14, categoria_id: 20, nome: 'Cinto',            descricao: 'Cinto de couro sintético, várias cores disponíveis.',     preco: 49.99,    estoque: 20, imagem: '/uploads/produtos/cinto.png'           },
 
    // Brinquedos - Educativos (28)
    { id: 76, loja_id: 25, categoria_id: 28, nome: 'Lego',             descricao: 'Conjunto de blocos de montar para estimular a criatividade.', preco: 149.99, estoque: 0, imagem: '/uploads/produtos/lego.png'            },
    // Brinquedos - Bonecas (29)
    { id: 77, loja_id: 25, categoria_id: 29, nome: 'Casinha de Boneca',descricao: 'Casinha de brinquedo completa para bonecas.',             preco: 199.99,   estoque: 6,  imagem: '/uploads/produtos/casinhadebrinquedo.png'},
    // Brinquedos - Eletrônicos Kids (30)
    { id: 78, loja_id: 26, categoria_id: 30, nome: 'Tablet Infantil',  descricao: 'Tablet educativo com jogos e conteúdo infantil.',         preco: 299.99,   estoque: 8,  imagem: '/uploads/produtos/tabletinfantil.png'  },
 
    // Casa - Móveis (32)
    { id: 79, loja_id: 28, categoria_id: 32, nome: 'Sofá',             descricao: 'Sofá confortável de 2 lugares, ótimo para a sala.',       preco: 1899.99,  estoque: 0,  imagem: '/uploads/produtos/sofa.png'            },
    { id: 80, loja_id: 28, categoria_id: 32, nome: 'Prateleira',       descricao: 'Prateleira de parede para organização e decoração.',      preco: 129.99,   estoque: 10, imagem: '/uploads/produtos/prateleira.png'      },
    // Casa - Cozinha (33)
    { id: 81, loja_id: 28, categoria_id: 33, nome: 'Panela de Pressão',descricao: 'Panela de pressão de alta durabilidade.',                  preco: 179.99,   estoque: 8,  imagem: '/uploads/produtos/paneladepressao.png' },
    { id: 82, loja_id: 28, categoria_id: 33, nome: 'Conjunto de Talheres',descricao: 'Conjunto de talheres em aço inox para 6 pessoas.',      preco: 99.99,    estoque: 14, imagem: '/uploads/produtos/conjuntotalher.png'  },
  ]

  for (const p of produtos) {
    await prisma.produtos.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        loja_id: p.loja_id,
        categoria_id: p.categoria_id,
        nome: p.nome,
        preco: p.preco,
        estoque: p.estoque,
        imagens_produto: {
          create: [{ url_imagem: p.imagem, ordem: 1 }]
        }
      }
    })
  }
  console.log('✅ Produtos e imagens criados')

  
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Usuarios"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "Usuarios"))`)
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Lojas"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "Lojas"))`)
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Categorias"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "Categorias"))`)
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Produtos"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "Produtos"))`)
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Imagens_produto"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "Imagens_produto"))`)


  console.log('🎉 Seed concluído!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())