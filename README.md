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
- [x] Validações com a biblioteca Yup
- [x] Autenticação JWT
- [x] Criptofrafia do password com bcryptjs
- [x] Middleware de login
- [x] Middleware de permissão admin
- [x] Middleware de tratamento de erros(ExpectionHandler)

---
<h1>Configurações necessárias</h1>
<h2>Crie um projeto no firebase</h2>
<ul>
   <li>Acesse https://console.firebase.google.com/u/2/</li>
   <li>Clique em "adicionar projeto", insira o nome que desejar para seu projeto e clique em "continuar".</li>
   <li>Desmarque a opção "ativar o google analytics neste projeto", clique em "criar projeto", aguarde a criação e depois clique em "continuar".</li>
   <li>Na tela principal aparecerá a frase "Comece adicionando o Firebase ao seu aplicativo". Clique no icone "</>" logo abaixo desta frase, digite um apelido para sua aplicação web e clique em "registrar app".</li>
   <li>Aparecerá um objeto chamado "firebaseConfig", onde tem as configuraçõesnecessárias para conectar a sua conta do firebase. Esses valores serão adicionados em um arquivo .env que está explicado logo abaixo. Guarde esses valores, não vá perder hein? ;)</li>
   <li>Após guardar os valores pode clicar em "continuar no console".</li>
</ul>

<h2>Configurar o armazenamento dos arquivos</h2>
<ul>
   <li>Os arquivos são armazenados no storage do firebase. Para visualizar abra o menu principal e clique em "Storage".</li>
   <li>Clique em "vamos começar", selecione a opção "Iniciar no modo de teste" e clique em "próxima".</li>
   <li>Selecione o local desejado do storage (recomendo southamerica), clique em "concluir" e aguarde a criação do storage.</li>
   <li>Todos os arquivos armazenados poderão ser visualizados nesta página do storage.</li>
</ul>

<h2>Configure o banco de dados relacional de sua preferência</h2>
<ul>
   <li>Cada banco de dados vai ter suas particularidades, então busque como fazer a configuração inicial do seu banco desejado.</li>
   <li>Crie o database com o nome que desejar e deixe guardadinha a URL de conexão com seu banco, pois será necessária adicionar no arquivo .env que será criado logo abaixo.</li>
</ul>

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

# Os valores das variáveis abaixo você encontra no firebase em "configurações do projeto" > "geral".
- FIREBASE_API_KEY="<your-api-key>"
- FIREBASE_AUTH_DOMAIN="<your-auth-domain>"
- FIREBASE_PROJECT_ID="<your-project-id>"
- FIREBASE_STORAGE_BUCKET="<your-storage-bucket-url>"
- FIREBASE_MESSAGING_SENDER_ID="<your-messaging-sender-id>"
- FIREBASE_APP_ID="<your-app-id>"

# Conecte o Prisma com o seu banco, no arquivo
- schema.prisma(obs:caso seu banco não seja o Postgresql)

# Faça as migrates do Prisma a partir do comando
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3333 - acesse <http://localhost:3333>
```
