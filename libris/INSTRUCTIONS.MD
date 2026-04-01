# Instruções para Avaliação do Projeto Libris

Este documento fornece as instruções necessárias para configurar, executar e avaliar o projeto **Libris**.

## 1. Visão Geral do Projeto

O **Libris** é uma aplicação web desenvolvida em React com TypeScript que permite aos usuários explorar livros da Google Books API, gerenciar uma estante pessoal e acompanhar o status de leitura. A aplicação simula um ambiente de autenticação e oferece uma experiência de usuário rica com internacionalização, temas e animações.

## 2. Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente:

### 2.1. Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e o npm (ou yarn/pnpm) instalados em sua máquina.

### 2.2. Instalação das Dependências

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/missetubal/inbazz-react-frontend-challenge
    cd libris
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    # ou pnpm install
    ```

### 2.3. Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para a chave da Google Books API.

1.  Crie um arquivo `.env` na raiz do projeto.
2.  Adicione a sua chave da Google Books API:
    ```env
    VITE_GOOGLE_BOOKS_API_KEY=SUA_CHAVE_DA_API_DO_GOOGLE_BOOKS
    ```
    Você pode obter uma chave da API seguindo as instruções em: [Google Books API - Get an API Key](https://developers.google.com/books/docs/v1/getting_started#APIKey)

### 2.4. Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou yarn dev
# ou pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### 2.5. Executando os Testes

Para rodar os testes unitários do projeto:

```bash
npm test
# ou yarn test
# ou pnpm test
```

## 3. Credenciais de Teste (Autenticação Simulada)

A autenticação é simulada no frontend e persistida no `localStorage`. Você pode usar as seguintes credenciais para testar o login:

*   **Email:** `test@example.com`
*   **Senha:** `password123`

Você também pode registrar um novo usuário com qualquer email e senha.

## 4. Diferenciais e Pontos de Destaque

Ao avaliar o projeto, considere os seguintes pontos:

*   **Arquitetura Modular (Feature-based)**: Organização do código em features (`auth`, `discover`, `shelf`, `landing`, `books`) com responsabilidades bem definidas, promovendo escalabilidade e manutenção.
*   **Gerenciamento de Estado Robusto**:
    *   **Zustand**: Utilizado para estado global (autenticação, tema, idioma e a estante de livros).
    *   **Persistência**: A estante de livros e o estado de autenticação são persistidos no `localStorage`, suportando múltiplos usuários para a estante.
*   **Integração com Google Books API**:
    *   **TanStack Query**: Gerenciamento eficiente de cache, loading states e erros para as requisições à API.
    *   **Tratamento de Dados Inconsistentes**: Adapters (`mapApiItemsToBooks`) para normalizar e enriquecer os dados da API, lidando com campos ausentes (capa, autores, data de publicação).
    *   **Debounce na Busca**: Implementação de debounce para otimizar as chamadas à API durante a digitação na busca.
    *   **Paginação e Limites**: Gerenciamento de paginação (`startIndex`, `maxResults`) e respeito ao limite de ~1000 itens retornáveis pela API.
*   **Experiência do Usuário (UX/UI)**:
    *   **Shadcn/ui e Tailwind CSS**: Componentes acessíveis e estilização flexível.
    *   **Internacionalização (i18n)**: Suporte a múltiplos idiomas (Português e Inglês) com `react-i18next`.
    *   **Tema Claro/Escuro**: Alternância de tema com persistência.
    *   **Animações**: Uso de `Framer Motion` para transições suaves e feedback visual (skeletons, fade-in).
    *   **Estados Vazios e Skeletons**: Feedback visual claro para carregamento de dados e quando não há conteúdo.
*   **Testes Unitários**: Cobertura de testes para a lógica de negócio dos hooks (autenticação, descoberta de livros, estante, landing page).
*   **Roteamento Avançado**: Uso de `TanStack Router` com rotas protegidas e redirecionamentos baseados no estado de autenticação.
*   **Validação de Formulários**: `React Hook Form` com `Zod` para validação robusta de formulários de login e registro.

## 5. Estrutura de Arquivos e Arquitetura Detalhada

Para uma compreensão mais aprofundada da estrutura de pastas, decisões de design e como os desafios da Google Books API foram abordados, consulte o arquivo `ARCHITECTURE.md` na raiz do projeto.

---