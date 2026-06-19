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
    prisma.lojas.upsert({ where: { id: 1  }, update: {}, create: { id: 1,  usuarioId: 1, categoria_id: 1, nome: 'BlueBerry Mercado',     logo_url: '/uploads/lojas/BlueBerryMercado.png'     } }),
    prisma.lojas.upsert({ where: { id: 2  }, update: {}, create: { id: 2,  usuarioId: 2, categoria_id: 1, nome: 'CJR Mercado',           logo_url: '/uploads/lojas/cjrMercado.png'           } }),
    prisma.lojas.upsert({ where: { id: 3  }, update: {}, create: { id: 3,  usuarioId: 3, categoria_id: 1, nome: 'Mango Mercado',         logo_url: '/uploads/lojas/mangoMercado.png'         } }),
    prisma.lojas.upsert({ where: { id: 4  }, update: {}, create: { id: 4,  usuarioId: 4, categoria_id: 1, nome: 'Maumar Mercado',        logo_url: '/uploads/lojas/maumarMercado.png'        } }),
    prisma.lojas.upsert({ where: { id: 5  }, update: {}, create: { id: 5,  usuarioId: 5, categoria_id: 1, nome: 'Spicy Mercado',         logo_url: '/uploads/lojas/spicyMercado.png'         } }),
    prisma.lojas.upsert({ where: { id: 6  }, update: {}, create: { id: 6,  usuarioId: 1, categoria_id: 1, nome: 'Dog Goods Mercado',     logo_url: '/uploads/lojas/dogGoodsMercado.png'      } }),
    // Farmácia
    prisma.lojas.upsert({ where: { id: 7  }, update: {}, create: { id: 7,  usuarioId: 2, categoria_id: 2, nome: 'BeWell Farmácia',       logo_url: '/uploads/lojas/BeWellFarmacia.png'       } }),
    // Beleza
    prisma.lojas.upsert({ where: { id: 8  }, update: {}, create: { id: 8,  usuarioId: 3, categoria_id: 3, nome: 'Creamy Skincare Beleza',logo_url: '/uploads/lojas/CreamySkincareBeleza.png' } }),
    prisma.lojas.upsert({ where: { id: 9  }, update: {}, create: { id: 9,  usuarioId: 4, categoria_id: 3, nome: 'Nalu Beleza',           logo_url: '/uploads/lojas/naluBeleza.png'           } }),
    prisma.lojas.upsert({ where: { id: 10 }, update: {}, create: { id: 10, usuarioId: 5, categoria_id: 3, nome: 'Rare Beauty Beleza',    logo_url: '/uploads/lojas/RareBeatyBeleza.png'      } }),
    prisma.lojas.upsert({ where: { id: 11 }, update: {}, create: { id: 11, usuarioId: 1, categoria_id: 3, nome: 'Roots Beleza',          logo_url: '/uploads/lojas/rootsBeleza.png'          } }),
    prisma.lojas.upsert({ where: { id: 12 }, update: {}, create: { id: 12, usuarioId: 2, categoria_id: 3, nome: 'Rose Beleza',           logo_url: '/uploads/lojas/RoseBeleza.png'           } }),
    prisma.lojas.upsert({ where: { id: 13 }, update: {}, create: { id: 13, usuarioId: 3, categoria_id: 3, nome: 'Dcarts Beleza',         logo_url: '/uploads/lojas/dcarts&basketsMercado.png'} }),
    // Moda
    prisma.lojas.upsert({ where: { id: 14 }, update: {}, create: { id: 14, usuarioId: 4, categoria_id: 4, nome: 'Amoca Moda',            logo_url: '/uploads/lojas/AmocaModa.png'            } }),
    prisma.lojas.upsert({ where: { id: 15 }, update: {}, create: { id: 15, usuarioId: 5, categoria_id: 4, nome: 'Amore Casa Moda',       logo_url: '/uploads/lojas/AmoreCasa.png'            } }),
    prisma.lojas.upsert({ where: { id: 16 }, update: {}, create: { id: 16, usuarioId: 1, categoria_id: 4, nome: 'Bel Moda',              logo_url: '/uploads/lojas/belmoda.png'              } }),
    prisma.lojas.upsert({ where: { id: 17 }, update: {}, create: { id: 17, usuarioId: 2, categoria_id: 4, nome: 'Melina Couture Moda',   logo_url: '/uploads/lojas/MelinaCoutureModa.png'    } }),
    prisma.lojas.upsert({ where: { id: 18 }, update: {}, create: { id: 18, usuarioId: 3, categoria_id: 4, nome: 'Sneaker Store Moda',    logo_url: '/uploads/lojas/sneakerStoreModa.png'     } }),
    // Eletrônicos
    prisma.lojas.upsert({ where: { id: 19 }, update: {}, create: { id: 19, usuarioId: 4, categoria_id: 5, nome: 'Electree Eletrônicos',  logo_url: '/uploads/lojas/electreeEletronicos.png'  } }),
    prisma.lojas.upsert({ where: { id: 20 }, update: {}, create: { id: 20, usuarioId: 5, categoria_id: 5, nome: 'Nako Eletrônicos',      logo_url: '/uploads/lojas/nakoEletronicos.png'      } }),
    prisma.lojas.upsert({ where: { id: 21 }, update: {}, create: { id: 21, usuarioId: 1, categoria_id: 5, nome: 'Repiit Eletrônicos',    logo_url: '/uploads/lojas/repiitEletronicos.png'    } }),
    prisma.lojas.upsert({ where: { id: 22 }, update: {}, create: { id: 22, usuarioId: 2, categoria_id: 5, nome: 'Think Digital',         logo_url: '/uploads/lojas/ThinkDigitalEletronicos.png'} }),
    prisma.lojas.upsert({ where: { id: 23 }, update: {}, create: { id: 23, usuarioId: 3, categoria_id: 5, nome: 'Level Up Tecnologia',   logo_url: '/uploads/lojas/LevelUpTecnologia.png'    } }),
    // Jogos
    prisma.lojas.upsert({ where: { id: 24 }, update: {}, create: { id: 24, usuarioId: 4, categoria_id: 6, nome: 'Magic Chicken Jogos',   logo_url: '/uploads/lojas/MagicChickenJogos.png'    } }),
    // Brinquedos
    prisma.lojas.upsert({ where: { id: 25 }, update: {}, create: { id: 25, usuarioId: 5, categoria_id: 7, nome: 'Kuby Brinquedos',       logo_url: '/uploads/lojas/kubyBrinquedos.png'       } }),
    prisma.lojas.upsert({ where: { id: 26 }, update: {}, create: { id: 26, usuarioId: 1, categoria_id: 7, nome: 'PopIrinc Brinquedos',   logo_url: '/uploads/lojas/PoplrincBrinquedos.png'   } }),
    // Casa
    prisma.lojas.upsert({ where: { id: 27 }, update: {}, create: { id: 27, usuarioId: 2, categoria_id: 8, nome: 'Fluffy House Casa',     logo_url: '/uploads/lojas/fluffyHouseCasa.png'      } }),
    prisma.lojas.upsert({ where: { id: 28 }, update: {}, create: { id: 28, usuarioId: 3, categoria_id: 8, nome: 'Mini Reno Casa',        logo_url: '/uploads/lojas/miniRenoCasa.png'         } }),
    prisma.lojas.upsert({ where: { id: 29 }, update: {}, create: { id: 29, usuarioId: 4, categoria_id: 8, nome: 'Whiskers Mercado Casa', logo_url: '/uploads/lojas/WhiskersMercado.png'      } }),
  ])
  console.log('✅ Lojas criadas')

  // ==================== PRODUTOS ====================
  const produtos = [
    // Celulares (21)
    { id: 1,  loja_id: 21, categoria_id: 21, nome: 'iPhone 6',       preco: 899.99,   estoque: 5,  imagem: '/uploads/produtos/iphone6.png'         },
    { id: 2,  loja_id: 21, categoria_id: 21, nome: 'iPhone 15',      preco: 4769.10,  estoque: 3,  imagem: '/uploads/produtos/iphone15.png'        },
    { id: 3,  loja_id: 20, categoria_id: 21, nome: 'iPhone 16',      preco: 5999.99,  estoque: 2,  imagem: '/uploads/produtos/iphone16.png'        },
    { id: 4,  loja_id: 20, categoria_id: 21, nome: 'Samsung S25 Ultra', preco: 5769.10, estoque: 4, imagem: '/uploads/produtos/S25Ultra.png'       },
    { id: 5,  loja_id: 22, categoria_id: 21, nome: 'Samsung Z Fold', preco: 8999.99,  estoque: 1,  imagem: '/uploads/produtos/samsungzFold.png'    },
    // Notebooks (22)
    { id: 6,  loja_id: 23, categoria_id: 22, nome: 'Macbook',        preco: 15899.99, estoque: 2,  imagem: '/uploads/produtos/macbook.png'         },
    { id: 7,  loja_id: 22, categoria_id: 22, nome: 'Notebook Lenovo',preco: 3899.99,  estoque: 5,  imagem: '/uploads/produtos/notebookLenovo.png'  },
    { id: 8,  loja_id: 23, categoria_id: 22, nome: 'Samsung Book',   preco: 4599.99,  estoque: 3,  imagem: '/uploads/produtos/samsungbook.png'     },
    // TVs (23)
    { id: 9,  loja_id: 19, categoria_id: 23, nome: 'TV Samsung 65"', preco: 3499.00,  estoque: 2,  imagem: '/uploads/produtos/TVsamsung65.png'     },
    { id: 10, loja_id: 19, categoria_id: 23, nome: 'TV Samsung 50"', preco: 1899.00,  estoque: 4,  imagem: '/uploads/produtos/televisao50.png'     },
    { id: 11, loja_id: 22, categoria_id: 23, nome: 'TV LG 43"',      preco: 1229.00,  estoque: 3,  imagem: '/uploads/produtos/televisao43LG.png'   },
    { id: 12, loja_id: 19, categoria_id: 23, nome: 'Monitor 24"',    preco: 899.99,   estoque: 6,  imagem: '/uploads/produtos/monitor24.png'       },
    { id: 13, loja_id: 20, categoria_id: 23, nome: 'Monitor 27"',    preco: 1299.99,  estoque: 4,  imagem: '/uploads/produtos/monitor27.png'       },
    // Acessórios Tech (24)
    { id: 14, loja_id: 21, categoria_id: 24, nome: 'Earbuds',        preco: 499.99,   estoque: 8,  imagem: '/uploads/produtos/earbuds.png'         },
    { id: 15, loja_id: 22, categoria_id: 24, nome: 'Headset',        preco: 899.99,   estoque: 5,  imagem: '/uploads/produtos/Headset.png'         },
    { id: 16, loja_id: 23, categoria_id: 24, nome: 'Cabo HDMI',      preco: 49.99,    estoque: 20, imagem: '/uploads/produtos/caboHDMI.png'        },
    { id: 17, loja_id: 20, categoria_id: 24, nome: 'Mouse Multilaser',preco: 129.99,  estoque: 10, imagem: '/uploads/produtos/mouseMultilaser.png' },
    { id: 18, loja_id: 19, categoria_id: 24, nome: 'Mouse Teclado',  preco: 199.99,   estoque: 7,  imagem: '/uploads/produtos/mouseteclado.png'    },
    { id: 19, loja_id: 21, categoria_id: 24, nome: 'iPad 11"',       preco: 4299.99,  estoque: 3,  imagem: '/uploads/produtos/ipad11.png'          },
    { id: 20, loja_id: 20, categoria_id: 24, nome: 'Smartwatch',     preco: 1299.99,  estoque: 4,  imagem: '/uploads/produtos/smartwatch.png'      },
    { id: 21, loja_id: 22, categoria_id: 24, nome: 'JBL',            preco: 599.99,   estoque: 6,  imagem: '/uploads/produtos/jbl.png'             },
    { id: 22, loja_id: 23, categoria_id: 24, nome: 'SoundBar',       preco: 899.99,   estoque: 3,  imagem: '/uploads/produtos/SoundBar.png'        },
    // Consoles (25)
    { id: 23, loja_id: 24, categoria_id: 25, nome: 'PS5',            preco: 4299.99,  estoque: 2,  imagem: '/uploads/produtos/PS5.png'             },
    { id: 24, loja_id: 24, categoria_id: 25, nome: 'Xbox Series',    preco: 3599.99,  estoque: 1,  imagem: '/uploads/produtos/XboxSeries.png'      },
    { id: 25, loja_id: 24, categoria_id: 25, nome: 'Xbox S',         preco: 1999.99,  estoque: 3,  imagem: '/uploads/produtos/xboxs.png'           },
    { id: 26, loja_id: 24, categoria_id: 25, nome: 'Nintendo Switch',preco: 2199.99,  estoque: 4,  imagem: '/uploads/produtos/NintendoSwitch.png'  },
    { id: 27, loja_id: 24, categoria_id: 25, nome: 'Nintendo 3DS',   preco: 899.99,   estoque: 2,  imagem: '/uploads/produtos/nintendo3ds.png'     },
    // Beleza - Maquiagem (15)
    { id: 28, loja_id: 10, categoria_id: 15, nome: 'Base',           preco: 89.99,    estoque: 15, imagem: '/uploads/produtos/base.png'            },
    { id: 29, loja_id: 10, categoria_id: 15, nome: 'Blush',          preco: 69.99,    estoque: 12, imagem: '/uploads/produtos/blush.png'           },
    { id: 30, loja_id: 12, categoria_id: 15, nome: 'Batom Rosa',     preco: 49.99,    estoque: 20, imagem: '/uploads/produtos/batomrosa.png'       },
    { id: 31, loja_id: 12, categoria_id: 15, nome: 'Batom Vermelho', preco: 49.99,    estoque: 18, imagem: '/uploads/produtos/batomVermelho.png'   },
    { id: 32, loja_id: 11, categoria_id: 15, nome: 'Bronzer',        preco: 79.99,    estoque: 10, imagem: '/uploads/produtos/bronzer.png'         },
    { id: 33, loja_id: 10, categoria_id: 15, nome: 'Contorno',       preco: 59.99,    estoque: 14, imagem: '/uploads/produtos/contorno.png'        },
    { id: 34, loja_id: 13, categoria_id: 15, nome: 'Corretivo',      preco: 39.99,    estoque: 25, imagem: '/uploads/produtos/corretivo.png'       },
    { id: 35, loja_id: 11, categoria_id: 15, nome: 'Delineador',     preco: 29.99,    estoque: 30, imagem: '/uploads/produtos/delineador.png'      },
    { id: 36, loja_id: 12, categoria_id: 15, nome: 'Iluminador',     preco: 69.99,    estoque: 16, imagem: '/uploads/produtos/iluminador.png'      },
    { id: 37, loja_id: 10, categoria_id: 15, nome: 'Mascara Cílios', preco: 54.99,    estoque: 22, imagem: '/uploads/produtos/MascaraDeCilios.png' },
    { id: 38, loja_id: 13, categoria_id: 15, nome: 'Mini Blush',     preco: 39.99,    estoque: 18, imagem: '/uploads/produtos/MiniBlush.png'       },
    { id: 39, loja_id: 11, categoria_id: 15, nome: 'Paleta Sombras', preco: 99.99,    estoque: 8,  imagem: '/uploads/produtos/paletadesombras.png' },
    { id: 40, loja_id: 12, categoria_id: 15, nome: 'Po Compacto',    preco: 44.99,    estoque: 20, imagem: '/uploads/produtos/poCompacto.png'      },
    { id: 41, loja_id: 10, categoria_id: 15, nome: 'Po',             preco: 34.99,    estoque: 25, imagem: '/uploads/produtos/po.png'              },
    { id: 42, loja_id: 13, categoria_id: 15, nome: 'Primer',         preco: 64.99,    estoque: 15, imagem: '/uploads/produtos/primer.png'          },
    { id: 43, loja_id: 11, categoria_id: 15, nome: 'Primer Bastão',  preco: 54.99,    estoque: 12, imagem: '/uploads/produtos/primerbastao.png'    },
    { id: 44, loja_id: 12, categoria_id: 15, nome: 'Sombra Rosa',    preco: 44.99,    estoque: 18, imagem: '/uploads/produtos/sombrarosa.png'      },
    // Skincare (16)
    { id: 45, loja_id: 8,  categoria_id: 16, nome: 'Bruma Labial',   preco: 34.99,    estoque: 20, imagem: '/uploads/produtos/BrumaLabial.png'     },
    { id: 46, loja_id: 8,  categoria_id: 16, nome: 'Creme de Mão',   preco: 29.99,    estoque: 25, imagem: '/uploads/produtos/cremedemao.png'      },
    { id: 47, loja_id: 9,  categoria_id: 16, nome: 'Creme Rare Beauty',preco: 89.99,  estoque: 10, imagem: '/uploads/produtos/cremeRareBeaty.png'  },
    { id: 48, loja_id: 8,  categoria_id: 16, nome: 'Gel Banho',      preco: 39.99,    estoque: 18, imagem: '/uploads/produtos/geldebanho.png'      },
    { id: 49, loja_id: 9,  categoria_id: 16, nome: 'Gel Perfumado',  preco: 49.99,    estoque: 15, imagem: '/uploads/produtos/GelPerfumado.png'    },
    { id: 50, loja_id: 8,  categoria_id: 16, nome: 'Gloss Marrom',   preco: 34.99,    estoque: 22, imagem: '/uploads/produtos/glossmarrom.png'     },
    { id: 51, loja_id: 9,  categoria_id: 16, nome: 'Gloss Rare Beauty',preco: 44.99,  estoque: 16, imagem: '/uploads/produtos/glossRareBeaty.png'  },
    { id: 52, loja_id: 8,  categoria_id: 16, nome: 'Gloss Vinho',    preco: 34.99,    estoque: 20, imagem: '/uploads/produtos/glossvinh9o.png'     },
    { id: 53, loja_id: 9,  categoria_id: 16, nome: 'Lápis Labial',   preco: 24.99,    estoque: 30, imagem: '/uploads/produtos/lapis labial.png'    },
    // Perfumes (17)
    { id: 54, loja_id: 11, categoria_id: 17, nome: 'Perfume Rare Beauty',preco: 299.99,estoque: 8, imagem: '/uploads/produtos/perfumeRare.png'     },
    // Casa - Decoração (31)
    { id: 55, loja_id: 27, categoria_id: 31, nome: 'Vitrola Vintage', preco: 899.99,  estoque: 3,  imagem: '/uploads/produtos/vitrolavintage.png'  },
    // Adaptador (Acessórios Tech)
    { id: 56, loja_id: 22, categoria_id: 24, nome: 'Adaptador Cartão',preco: 29.99,   estoque: 15, imagem: '/uploads/produtos/adaptadorcartaosd.png'},
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