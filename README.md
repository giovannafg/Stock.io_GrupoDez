# Stock.io - Back-end

Este é o repositorio do back-end do Stock.io.

Repositorio do front-end:

```
https://github.com/giovannafg/Stock.io_GrupoDez_Front-end
```

## Instalar dependencias

```bash
npm install
```

## Rodar o projeto

```bash
npm run start:dev
```

## Banco e seed

Para resetar o banco:

```bash
npx prisma migrate reset
```

Para rodar a seed:

```bash
npx tsx prisma/seed.ts
```
