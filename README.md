# 🚀 Colet WebApp

## 🎯 Sobre o Projeto

O **Colet** é uma plataforma inovadora projetada para conectar empresas de reciclagem a outras empresas e indivíduos, criando um marketplace para a compra e venda de materiais excedentes e recicláveis.

O objetivo principal é fomentar a sustentabilidade e a economia circular. Ao facilitar a negociação de materiais que seriam descartados, o Colet incentiva a reciclagem através do lucro, movimenta o mercado de recicláveis e contribui para a preservação do meio ambiente. A plataforma transforma sobras, como óleo de cozinha usado, em oportunidades de negócio, permitindo que se tornem matéria-prima para novos produtos, como sabão.

Dessa forma, o Colet age nas esferas social, econômica e ambiental para promover um futuro mais sustentável.

## ✨ Funcionalidades Principais

A plataforma conta com um fluxo completo de negociação e marketplace:

- **📦 Gestão de Produtos**: Usuários podem criar, editar e gerenciar anúncios de seus materiais recicláveis, incluindo o upload de múltiplas imagens.
- **🛒 Marketplace e Descoberta**: Navegue por produtos, visualize detalhes e filtre por categorias.
- **💳 Compra Direta**: Compre produtos diretamente com um fluxo de pagamento seguro e em etapas, integrado com o Stripe.
- **💬 Sistema de Negociação**: Faça ofertas por produtos com valores diferentes do anunciado. Cada negociação inicia um chat privado entre o comprador e o vendedor.
- **🤝 Gestão de Ofertas**: Vendedores podem aceitar ou recusar ofertas recebidas diretamente na tela de chat.
- **📄 Pedidos Automáticos**: Quando uma oferta é aceita, um pedido é criado automaticamente, aguardando o pagamento.
- **📋 Painel de Pedidos**: Gerencie todos os seus pedidos de compra e venda, com filtros por status (Pendente, Pago, Cancelado).

## 📁 Estrutura de Pastas

O projeto utiliza o App Router do Next.js e segue uma arquitetura organizada para escalabilidade e manutenção.

```
/src
├── @types/          # Definições de tipos TypeScript globais
├── app/             # Estrutura de rotas e páginas do Next.js 13+
│   ├── (private)/   # Rotas que exigem autenticação
│   ├── (public)/    # Rotas públicas (ex: login, home)
│   └── api/         # API routes do Next.js (ex: NextAuth)
├── components/      # Componentes React
│   ├── routes/      # Componentes específicos de uma página/rota
│   ├── shared/      # Componentes reutilizáveis em várias partes da aplicação
│   └── ui/          # Componentes de UI primitivos (shadcn/ui)
├── constants/       # Constantes da aplicação (rotas, enums, etc.)
├── hooks/           # Hooks customizados do React
├── lib/             # Funções utilitárias e configurações (ex: auth)
├── providers/       # Provedores de contexto globais (React Query, Tema, etc.)
├── services/        # Camada de serviço para comunicação com a API backend
└── validations/     # Schemas de validação com Zod
```

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/colet-webapp.git
cd colet-webapp
```

### 2. Instalar as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto. Você pode copiar o arquivo `.env.example` (se existir) ou criá-lo do zero.

```bash
cp .env.example .env.local
```

Preencha o arquivo `.env.local` com as chaves necessárias. Veja a seção abaixo para saber como obtê-las.

### 4. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

## 🔑 Variáveis de Ambiente

Para que a aplicação funcione corretamente, você precisará configurar as seguintes variáveis no seu arquivo `.env.local`:

| Variável                        | Descrição                                                                                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`           | A URL base da sua API backend. Para desenvolvimento local, geralmente é algo como `http://localhost:3333/api`.                                                                                 |
| `NEXT_PUBLIC_BACKEND_URL`       | A URL pública do seu servidor backend, usada para servir arquivos estáticos (imagens). Em desenvolvimento, geralmente é a mesma da API, mas sem o sufixo `/api` (ex: `http://localhost:3333`). |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | A chave **publicável** (Publishable Key) do Stripe, usada para inicializar o Stripe.js no frontend.                                                                                            |
| `NEXTAUTH_URL`                  | A URL canônica da sua aplicação. Para desenvolvimento local, use `http://localhost:3000`.                                                                                                      |
| `NEXTAUTH_SECRET`               | Um segredo usado pelo NextAuth para assinar os JWTs. Você pode gerar um facilmente executando o comando `openssl rand -base64 32` no seu terminal.                                             |

### Como Obter a Chave do Stripe

1.  Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/).
2.  Navegue até a seção **Desenvolvedores** > **Chaves de API**.
3.  Copie a **Chave publicável** (ela começa com `pk_test_...` para o ambiente de teste).
4.  Cole este valor na variável `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`.
