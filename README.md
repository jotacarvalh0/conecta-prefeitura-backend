## 📋 Visão Geral

Este é o backend do sistema Conecta Prefeitura, construído com Node.js, Express e Prisma. Fornece APIs RESTful para gerenciamento de secretarias, comunicados e usuários com autenticação JWT.

## 🚀 Pré-requisitos

- Node.js v18+
- PostgreSQL 13+
- Yarn ou npm
- Git

## ⚙️ Configuração do Ambiente

**Clone o repositório**:

```
git clone https://github.com/jotacarvalh0/conecta-prefeitura-backend.git
cd conecta-prefeitura-backend
```

**Instale as dependências**:

```
npm install
```

**Configure o banco de dados**:

- Crie um banco PostgreSQL chamado `conecta_prefeitura`
- Atualize o arquivo `.env` com suas credenciais:

```
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/conecta_prefeitura?schema=public"
JWT_SECRET="sua_chave_secreta_jwt"
```

**Execute as migrações**:

```
npx prisma migrate dev
```

**Crie um usuário admin**:

```
npx ts-node src/scripts/createAdmin.ts
```

## 🏃 Executando o Projeto

```
npm run dev
```

## 🌐 Endpoints da API

### Autenticação

- `POST /login` - Autentica usuário
- `POST /usuarios` - Cria novo usuário
- `GET /perfil` - Obtém perfil do usuário (requer autenticação)

### Secretarias (Admin)

- `GET /secretarias` - Lista todas
- `POST /secretarias` - Cria nova (admin)
- `PUT /secretarias/:id` - Atualiza (admin)
- `DELETE /secretarias/:id` - Remove (admin)

### Comunicados

- `GET /comunicados` - Lista todos
- `POST /comunicados` - Cria novo (admin)
- `GET /secretarias/:id/comunicados` - Lista por secretaria

## 🔒 Autenticação

Inclua o token JWT no header das requisições protegidas:

```
Authorization: Bearer <token_jwt>
```

## 📦 Estrutura do Projeto

```
src/
├── controllers/    # Lógica dos endpoints
├── services/       # Regras de negócio
├── middlewares/    # Autenticação e validações
├── prisma/        # Configuração do ORM
├── routes/        # Definição das rotas
├── types/         # Tipos TypeScript
└── utils/         # Utilitários
```

## 🤝 Frontend

Para integrar com o frontend:

**Variáveis de ambiente**:

```
VITE_API_URL=http://localhost:3000
```

**Exemplo de chamada autenticada**:

javascript

```jsx
const response = await fetch('/perfil', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`}
});
```
