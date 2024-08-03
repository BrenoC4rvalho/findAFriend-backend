# Find A Friend (backend)

## ⌨️ Sobre o Projeto

Este projeto consiste em uma API criada utilizando [Node.js](https://nodejs.org/) com a utilização do [Fastify](https://fastify.dev/), e com a utilização do banco de dados [Postgres](https://www.postgresql.org/). Onde você pode criar uma organização e colocar Pets para a doação.

## Requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## 🛠️ Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## 🚀 Rodar o Projeto

Primeiramente, é necessário ter o Node.js instalado. Caso não tenha, faça a instalação [aqui](https://nodejs.org/en/download/).

Após instalar as dependências, e as variáveis de ambientes, no arquivo .env  execute o comando abaixo para rodar o projeto em modo de desenvolvimento:

```bash
docker compose up -d
npm run dev
```

Abra [http://localhost:3000](http://localhost:3333) no seu navegador para acessar o servidor.

## 📚 Endpoints da API

- **POST** `/orgs` - Cria uma nova organização
- **POST** `/orgs/authenticate` - Faz login como uma organização
- **GET** `/orgs/nearby` - Retorna todas as Orgs perto de você
- **POST** `/orgs/pets` - Cria um novo Pet, é necessário está logado como uma organização
- **GET** `/orgs/pets` - Retorna todos os pets perto de você, é necessário mandar a localização, e é possível filtrar informações
- **GET** `/orgs/pets/${:id}` - Retorna o pet do id

## 🧑‍💻 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [Prisma](https://www.prisma.io/)

