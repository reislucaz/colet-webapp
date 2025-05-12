# ♻️ Colet - Web App

**Colet** é o front-end de um aplicativo voltado para a coleta de resíduos recicláveis, com o objetivo de facilitar a conexão entre geradores de resíduos e pontos de coleta ou empresas recicladoras.

## 📸 Visão Geral

Esta aplicação permite aos usuários criarem e visualizarem produtos por categoria, permitindo assim o cadastro de sobressalentes para compra e venda a partir de parceiros interessados.

---

## 🚀 Tecnologias

- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

---

## 📦 Instalação

### Clone o repositório:

```bash
git clone https://github.com/seu-usuario/colet-web.git
cd colet-web
```

### Instale as dependências:

```bash
npm install
```

### 🚦 Execução
Antes de rodar o front-end, é necessário iniciar a API do projeto, que deve estar disponível separadamente. Certifique-se de que a API esteja em execução e acessível localmente (por exemplo, em http://localhost:3333).

### Em seguida, inicie o ambiente de desenvolvimento do front-end com:

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

### 🔧 Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto e defina a URL da API:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### 📁 Estrutura de Pastas
```bash
/pages       # Rotas da aplicação
/components  # Componentes utilizados para formar as páginas
```
