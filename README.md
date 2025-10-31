# 🌐 Ecommerce Challenge — Stefanini 🚀

Aplicação **full-stack** desenvolvida como parte do desafio técnico **Stefanini - E-commerce**.  
O projeto é composto por dois módulos principais:

- 🧩 **Backend:** API REST em **Node.js + Express + TypeScript**
- 💻 **Frontend:** Aplicação web em **Next.js + TypeScript + Tailwind CSS**

O objetivo é simular uma plataforma moderna de e-commerce, permitindo listar produtos, visualizar detalhes e gerenciar um carrinho de compras com subtotal dinâmico.

---

## 🧩 Sobre o projeto

O **Ecommerce Challenge Stefanini** é uma aplicação completa (frontend + backend) desenvolvida em **TypeScript** com o propósito de demonstrar práticas modernas de arquitetura, separação de responsabilidades e consumo de API REST.

A aplicação oferece:
- Listagem de produtos com paginação.
- Página de detalhes do produto.
- Carrinho funcional (adicionar, remover, atualizar quantidades).
- Cálculo de subtotal e preço promocional no backend.
- Interface responsiva e clean feita com **Tailwind CSS**.

---

## ⚙️ Pré-requisitos

Antes de iniciar, verifique se você possui instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (ou yarn/pnpm)
- **Git**

---

## ▶️ Como rodar o projeto localmente

> É recomendado usar **dois terminais** — um para o backend e outro para o frontend.

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/JoaoVitorS/ecommerce-challenge.git
cd ecommerce-challenge


### 2️⃣ Rodar o Backend
cd backend
npm install
npm run dev

O servidor será iniciado em:
👉 http://localhost:4000

### 3️⃣ Rodar o Frontend

cd frontend
npm install
npm run dev

A aplicação estará disponível em:
👉 http://localhost:3000
```

## 🔗 Endpoints principais (Backend)

| Método | Rota                | Descrição                                        |
|--------|---------------------|--------------------------------------------------|
| GET    | `/api/products`     | Lista todos os produtos disponíveis              |
| GET    | `/api/products/:id` | Retorna detalhes de um produto específico        |
| GET    | `/api/cart`         | Retorna o carrinho (itens, totais e subtotal)    |
| POST   | `/api/cart/add`     | Adiciona ou remove itens do carrinho `{ productId, qty }` |

> 💡 Para remover completamente um produto, envie `qty` negativo igual à quantidade atual.

## 💻 Páginas (Frontend)

| Página     | Rota             | Descrição                                                        |
|-------------|------------------|------------------------------------------------------------------|
| 🏠 **Home**     | `/`              | Lista todos os produtos com paginação simples                    |
| 🛍️ **Produto**  | `/product/:id`   | Mostra detalhes do produto e botão “Adicionar ao carrinho”      |
| 🧺 **Carrinho** | Drawer lateral   | Abre pelo ícone na navbar, permitindo adicionar, remover e ver subtotal |


## 🗂️ Estrutura do projeto

```
ecommerce-challenge/
├── backend/
│   ├── package.json
│   └── src/
│       ├── controllers/        # cartController.ts, productsController.ts
│       ├── routes/             # cart.ts, products.ts
│       ├── services/           # cartService.ts
│       ├── data/               # products.json (mock)
│       ├── utils/              # pricing.ts (effectivePrice, etc.)
│       ├── types.ts            # Tipos do backend
│       └── server.ts           # Bootstrap do Express
│
└── frontend/
    ├── package.json
    └── src/
        ├── app/                # Next.js App Router (layout.tsx, page.tsx, product/[id]/page.tsx)
        ├── components/         # Navbar.tsx, CartDrawer.tsx, ProductCard.tsx, etc.
        ├── lib/                # api.ts (apiGet/apiPost), types.ts
        ├── styles/             # globals.css, Tailwind config (se aplicável)
        └── types/              # (opcional) Tipos compartilhados do front

```

## 🧰 Tecnologias utilizadas

### Backend

Node.js

Express

TypeScript

### Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

Lucide React (ícones)


## 🧠 Observações importantes

O frontend consome o backend através de /api/*, usando rewrite configurado no next.config.js.

O subtotal e lineTotal dos produtos são calculados diretamente no backend (CartService).

O carrinho é mantido em memória (mock) apenas para fins de demonstração.

O projeto segue uma arquitetura modular, separando rotas, controllers e services.

Em caso de erro de hydration no Next, evite lógica com window, document, Date ou Math.random() no SSR.


### Listar produtos
curl http://localhost:4000/api/products

### Buscar produto específico
curl http://localhost:4000/api/products/1

### Ver carrinho
curl http://localhost:4000/api/cart

### Adicionar produto ao carrinho
curl -X POST http://localhost:4000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "qty": 2}'


### 👨‍💻 Autor

João Vitor Soares Silva - Desenvolvedor Fullstack

Desafio Técnico — Stefanini 2025

📧 joaovitorssilva7@gmail.com


