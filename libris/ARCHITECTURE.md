# Architecture Overview

Este documento descreve a arquitetura do projeto **Libris**, com foco em:

- Estrutura de pastas escolhida
- Como a autenticação foi gerenciada sem backend
- Desafios encontrados com a Google Books API e como foram tratados

---

## 1. Estrutura de pastas

O projeto segue uma arquitetura **feature-based**, organizada em torno de funcionalidades da aplicação, com uma camada `shared` para recursos reutilizáveis.

### Visão geral

```text
.
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router/
│   │   │   └── index.tsx
│   │   └── providers/
│   │       ├── theme-provider.tsx
│   │       └── index.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── landing/
│   │   ├── discover/
│   │   ├── books/
│   │   └── shelf/
│   │
│   ├── components/
│   │   ├── custom/
│   │   └── ui/
│   │
│   ├── shared/
│   │   ├── services/
│   │   ├── store/
│   │   ├── enums/
│   │   ├── i18n/
│   │   └── types.ts
│   │
│   ├── lib/
│   └── tests/
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.*.json
└── jest.config.ts
```

### 1.1. `src/app`

Responsável por **bootstrap** da aplicação:

- `App.tsx`
  - Cria o `QueryClient` (TanStack Query) e envolve a aplicação com `QueryClientProvider`.
  - Aplica `ThemeProvider` para gerenciar o tema via classe `light/dark` no `document.documentElement`.
  - Integra a auth com a estante: ao logar/deslogar, chama `useShelfStore.setUserId(user.id)` para carregar os livros daquele usuário.

- `router/index.tsx`
  - Configura as rotas com **TanStack Router**.
  - Define:
    - Rotas públicas: `/` (landing), `/login`, `/register`;
    - Rotas autenticadas: agrupadas na rota pai `authenticated`, com `beforeLoad` que verifica `isAuthenticated` na `auth-store`;
    - Redireciona usuários já autenticados de `/login` / `/register` para `/shelf`.
  - Rotas principais autenticadas:
    - `/discover` – descoberta de livros na Google Books API;
    - `/shelf` – estante pessoal do usuário;
    - `/book/$bookId` – detalhes de um livro.

- `providers/theme-provider.tsx`
  - Lê o tema da `useThemeStore` (Zustand).
  - Remove classes `light`/`dark` do `<html>` e adiciona a atual, garantindo que o Tailwind opere em modo “class”.

### 1.2. `src/features`

Cada feature agrupa **API**, **store**, **hooks**, **UI**, **schemas** e **testes** relativos àquela funcionalidade.

#### `features/auth`

Responsável pela autenticação simulada.

- **Model / Store**
  - `auth-store.ts` (Zustand + `persist`):
    - Estado: `user`, `token`, `isAuthenticated`, `isLoading`, `error`.
    - Ações: `login`, `register`, `logout`, `initializeAuth`.
    - Persistência em `localStorage` para manter sessão entre refreshes.
  - `AuthState` é tipado em `types.ts`.

- **API fake**
  - `auth-api.ts`:
    - `login(data)`: simula um delay, valida credenciais fixas (`test@example.com` / `password123`) e salva `token` + `user` no `localStorage`.
    - `register(data)`: simula criação de usuário sem backend real.
  - Toda a lógica se comporta como se houvesse um backend, mas é puramente client-side.

- **Formulários**
  - `login-form.tsx`, `register-form.tsx`:
    - React Hook Form + Zod (`loginschema.ts`, `registerschema.ts`).
    - Validação de email/senha com mensagens de erro traduzidas.
    - Integração com `useLoginForm` e `useRegisterForm` (hooks).

- **Hooks**
  - `useLoginForm`, `useRegisterForm`:
    - Encapsulam lógica de submit (chamam `authApi`, atualizam store, redirecionam via TanStack Router, exibem toasts).
    - Fornecem controle de estado de visibilidade de senha.
    - São testados com Jest/RTL.

- **UI**
  - `login-wrapper.tsx`, `register-wrapper.tsx`:
    - Containers das páginas de login/registro.
    - Usam os formulários + layout responsivo + textos traduzidos.

#### `features/landing`

Página inicial pública.

- **`LandingWrapper`**
  - Orquestra:
    - `Navbar`, `Hero`, `Features`, `ShelfPreview`, `Stats`, `Cta`, `Footer`.

- **Navbar**
  - Links para login/registro.
  - `LanguageToggle` e `ThemeToggle` (Zustand + i18next).

- **Hero + BookStack**
  - `Hero` consome `useGetHeroBooks`:
    - Hook que chama a Google Books API com uma query fixa (ex.: “literatura portuguesa”) e `maxResults: 5`.
    - Usa `mapApiItemsToBooks` para converter o retorno da API para o modelo interno `Book`.
  - Mostra uma pilha de livros animada com Framer Motion e CTA para começar a usar.

- **ShelfPreview + ShelfTable**
  - `useGetShelfPreviewTable`:
    - Chama a API com query de destaque (ex.: “mais lidos”) e `maxResults: 5`.
    - Exibe uma prévia dos livros em destaque na landing, em tabela compacta.

- **Features, Stats, Cta, Footer**
  - Conteúdo estático, mas com textos 100% traduzidos e design consistente com o resto da app.

#### `features/discover`

Busca de livros na Google Books API com filtros e paginação.

- **Hook principal: `useGetDiscoverBooks`**
  - Estado local:
    - `query`: texto da busca.
    - `printType`: tipo de conteúdo (books, magazines, etc.).
    - `orderBy`: ordenação (relevance, newest).
    - `page`: página atual.
    - `hasUserTyped`: controla empty state inicial.
  - Usa `useDebounce(query, 500)` para evitar chamadas em excesso à API.
  - Usa `useQuery` (TanStack Query) para buscar livros via `searchBooks` em `shared/services/google-book-api`.
  - Converte a resposta com `mapApiItemsToBooks`.
  - Calcula `totalPages` respeitando limite da API (corta em 1000 itens se necessário).

- **UI**
  - `SearchFilter`:
    - Inputs para texto, filtro de tipo (PrintType), ordenação (OrderBy).
    - Atualiza o estado do hook.
  - `DiscoverResults`:
    - Exibe skeletons, empty state, erros ou lista paginada.
    - Integração com `BookCard` e `BookCardSkeleton`.

#### `features/books`

Página de detalhes de um livro.

- **Hook: `useGetBookDetail`**
  - Recebe `bookId`.
  - Usa `useQuery` + `getBookById` (Google Books API).
  - Converte o item via `mapApiItemToBook`.
  - Integra com `useShelfStore` para saber se o livro está na estante (`isOnShelf`) e para adicionar/remover.

- **UI**
  - `BookDetailsWrapper`:
    - Usa o hook e exibe:
      - Skeleton enquanto carrega (`BookPageSkeleton`).
      - Mensagens de erro ou não encontrado.
      - Detalhes (título, autores, capa, descrição, categorias, etc.).
      - Botão para adicionar/remover da estante.
      - Link para “Preview” na própria Google Books (quando disponível).

#### `features/shelf`

Estante pessoal do usuário.

- **Store: `shelf-store.ts` (Zustand + persist)**
  - Estado:
    - `userShelves: Record<string, Book[]>`
      - Cada chave é um `userId`; o valor é a lista de livros da estante daquele usuário.
    - `currentUserId`
    - `books`: “view” da estante do usuário atual.
  - Ações:
    - `setUserId(userId)`:
      - Atualiza `currentUserId`.
      - Carrega `books` a partir de `userShelves[userId]`.
    - `addBook(book)`:
      - Adiciona o livro à estante do usuário atual (sem duplicar).
    - `removeBook(bookId)`:
      - Remove o livro da estante do usuário atual.
    - `updateStatus(bookId, newStatus)`:
      - Atualiza o `status` de leitura (wantToRead, reading, finished).
    - `isOnShelf(bookId)`:
      - Verifica se o livro já está na estante do usuário atual.
  - Persistência:
    - Usa `persist` com `createJSONStorage(() => localStorage)`.
    - `partialize` persiste apenas `userShelves` e `currentUserId`.
    - `onRehydrateStorage` reconstroi `books` após reidratar, baseado no `currentUserId`.

- **Hook: `useGetShelfData`**
  - Lê `books`, `removeBook`, `updateStatus` da store.
  - Estado local de ordenação:
    - `sortBy`: `title`, `authors`, `publishedDate` ou `status`.
    - `sortDirection`: `asc` / `desc`.
  - `sortedBooks`: `useMemo` que ordena `books` conforme `sortBy`/`sortDirection`.
  - Ações:
    - `handleRemoveBook(bookId)`: chama `removeBook` e exibe toast de sucesso.
    - `handleUpdateStatus(bookId, newStatus)`: chama `updateStatus` e exibe toast de sucesso.
  - Integração com i18n para mensagens de toast.

- **UI**
  - `ShelfWrapper`:
    - Exibe título, subtítulo e decide entre:
      - `ShelfEmptyState` (quando `sortedBooks.length === 0`);
      - `ShelfTable` (quando há livros).
  - `ShelfTable`:
    - Tabela com:
      - Capa, título (link para detalhes), autores, data de publicação, status, ações.
    - Status de leitura:
      - `Select` com opções mapeadas de `ReadingStatus` (WANT_TO_READ, READING, FINISHED).
      - `ReadingStatusBadge` mostra etiqueta estilizada para o status atual.
    - Botão para remover livro, com ícone de lixeira e toast.

---

## 2. Autenticação sem backend

A autenticação é 100% client-side, simulando o comportamento de um backend real, mas sem chamadas externas.

### 2.1. Fluxo de login

- Usuário acessa `/login`.
- Formulário é validado com **React Hook Form + Zod**.
- No submit:
  - `useLoginForm` chama `authApi.login`.
  - `authApi.login` simula delay e verifica credenciais fixas.
  - Em caso de sucesso:
    - Salva `user` e `token` em `localStorage`.
    - Atualiza a `auth-store` (Zustand) com `user`, `token`, `isAuthenticated = true`.
    - Redireciona para `/shelf` (ou rota de redirect, se houver, via TanStack Router).
    - `App.tsx` detecta `user.id` e chama `setUserId(user.id)` na `shelf-store`, carregando a estante daquele usuário.

### 2.2. Fluxo de registro

- Usuário acessa `/register`.
- Formulário validado com Zod (`name`, `email`, `password`, `confirmPassword`).
- No submit:
  - `useRegisterForm` chama `authApi.register`.
  - A API fake simula criação de usuário e retorna `user` + `token`.
  - A store é atualizada e o usuário é autenticado automaticamente, redirecionado para `/shelf`.

### 2.3. Proteção de rotas

- Rotas autenticadas estão sob a rota pai `authenticated`.
- `beforeLoad` da rota pai:
  - Lê `isAuthenticated` de `auth-store`.
  - Se `false`, redireciona para `/login`, passando `redirect` na query string.
- Rotas `/login` e `/register` também verificam `isAuthenticated`:
  - Se `true`, redirecionam para `/shelf`.

---

## 3. Integração com a Google Books API

A integração com a Google Books API foi feita de forma a:

- Encapsular detalhes de requisição em uma camada de serviço (`shared/services/google-book-api.ts`);
- Adaptar os dados “sujos” da API para um modelo interno consistente (`mapApiItemsToBooks`);
- Lidar com limites de resultados e paginação;
- Proteger a UX contra latência e erros.

### 3.1. Camada de serviço e adapter

- **Serviço**: `shared/services/google-book-api.ts`
  - Expõe funções como:
    - `searchBooks({ query, maxResults, orderBy, printType, startIndex })`;
    - `getBookById(id)`.
  - Centraliza o uso da `GOOGLE_BOOKS_API_KEY` e a base URL.

- **Tipos**: `shared/services/types.ts`
  - Define `GoogleBooksApiResponse` e tipos relacionados, baseado na resposta da API (incompleta/irregular por natureza).

- **Adapter**: `mapApiItemsToBooks` em `lib/book-utils.ts`
  - Recebe `GoogleBooksApiResponse['items']` e retorna um array de `Book` (modelo interno).
  - Tratar campos ausentes ou inconsistentes:
    - Título, autores, capa, descrição, data, categorias, etc. são sempre normalizados com defaults seguros.
  - Com isso, o restante da aplicação não depende diretamente do formato bruto da API, mantendo o domínio consistente.

### 3.2. Limite de resultados e paginação

- A Google Books API usa `startIndex` + `maxResults` e tem um limite prático de ~1000 resultados.
- `useGetDiscoverBooks`:
  - Controla `page` (0-based) e `PAGE_SIZE` (ex.: 12).
  - Converte para `startIndex = page * PAGE_SIZE`.
  - Calcula `totalPages` com base em `totalItems`, limitando a 1000 itens para evitar inconsistências.
  - Botões de navegação (próxima/anterior) respeitam esses limites.

- Landing:
  - `useGetHeroBooks` e `useGetShelfPreviewTable` fazem queries pequenas (`maxResults: 5`) apenas para exibir destaques.

### 3.3. Performance e chamadas excessivas

- Para evitar chamadas excessivas à API durante a digitação:
  - `useDebounce(query, 500)` é usado em `useGetDiscoverBooks`.
  - Só após 500 ms sem alterações no texto é que uma nova chamada é disparada.
- TanStack Query:
  - Cacheia resultados por `queryKey` (incluindo query, filtro, ordenação e página).
  - Evita requisições duplicadas para os mesmos parâmetros.
  - Expõe estado de loading/erro/dados para uma UX consistente.

### 3.4. Tratamento de erro e UX

- Todos os hooks que chamam a API expõem:
  - `isLoading`, `isError`, `error`, e os dados processados.
- Componentes de UI:
  - Exibem **skeletons** durante carregamento (cards, página de detalhe, tabela).
  - Mostram **empty states** claros quando não há resultados.
  - Exibem **mensagens de erro** amigáveis e traduzidas, com opção de tentar novamente ou voltar.
  - Fazem uso de toasts em operações críticas (ex.: adicionar/remover da estante, atualizar status de leitura).

---
