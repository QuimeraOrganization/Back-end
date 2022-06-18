<h1> Back-end Quimera </h1>

<h2>Sobre</h2>
<p> <strong>Esse projeto trata-se de apresentar para os clientes os produtos industrializados e ter a certeza se há
ou não a presença dos ingredientes em sua composição e desse modo, aumentar a inclusão e facilitar a vida de quem tem alergias alimentares, em especial as mais graves.
</strong></p>

<h2>Tecnologias</h2>
<ul>

   <li>NodeJS</li>
   <li>Express</li>
   <li>Prisma</li>
   <li>JWT</li>
   <li>Validação com Yup</li>
   <li>Postgresql</li>

</ul>

### Funcionalidades

- [x] Integração do Prisma com o banco Postgresql
- [x] Criação de tabela User com a ORM Prisma
- [x] CRUD de Users
- [x] CRUD de Products
- [x] CRUD de Ingredients
- [x] CRUD de Feedbacks
- [x] CRUD de Brands
- [x] CRUD de Categories
- [x] Token Controller
- [x] Validaçõe com a biblioteca Yup
- [x] Autenticação JWT
- [x] Criptofrafia do password com bcryptjs
- [x] Middleware de login
- [x] Middleware de permissão admin
- [x] Middleware de tratamento de erros(ExpectionHandler)

---

<h3> Acesse o projeto através dos comandos a baixo 👇</h3>

```bash

# Clone este repositório
$ git clone https://github.com/SquadQuimera/back-end.git

# Acesse a pasta do projeto no terminal/cmd
$ cd back-end

# Instale as dependências
$ npm install

# Crie um arquivo .env com os arquivos
- DATABASE_URL="a url do seu banco"
- TOKEN_SECRET="uma chave só sua, pode ser um hash aleatório"
- TOKEN_EXPIRATION=1d(aqui varia, você decide quanto tempo para o token expirar)

# Conecte o Prisma com o seu banco, no arquivo
- schema.prisma

# Faça as migrates do Prisma a partir do comando
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3030 - acesse <http://localhost:3333>
```
