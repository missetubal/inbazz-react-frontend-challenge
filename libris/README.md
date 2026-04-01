# Libris - Sua Estante de Livros Pessoal

O **Libris** é uma aplicação web moderna e responsiva para gerenciar sua paixão por livros. Explore um vasto catálogo de títulos da Google Books API, adicione seus favoritos à sua estante pessoal, acompanhe seu progresso de leitura e personalize sua experiência com temas e idiomas.

## 📚 Funcionalidades Principais

- **Exploração de Livros**: Pesquise e descubra milhões de livros através da Google Books API.
- **Estante Pessoal**: Adicione livros à sua estante, organize-os e acompanhe seu status de leitura (Quero Ler, Lendo, Lido).
- **Detalhes do Livro**: Visualize informações detalhadas sobre cada livro, incluindo capa, autores, descrição e data de publicação.
- **Autenticação Simulada**: Faça login ou registre-se para ter sua própria estante persistente.
- **Internacionalização (i18n)**: Alterne entre Português e Inglês para uma experiência localizada.
- **Tema Claro/Escuro**: Personalize a interface com seu tema preferido.
- **Experiência Fluida**: Animações suaves, estados de carregamento (skeletons) e feedback visual para uma navegação agradável.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna e robusta:

- **Framework**: [React](https://react.dev/) (com [Vite](https://vitejs.dev/) para build)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/)
- **Roteamento**: [TanStack Router](https://tanstack.com/router)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Gerenciamento de Dados Assíncronos**: [TanStack Query](https://tanstack.com/query)
- **Validação de Formulários**: [React Hook Form](https://react-hook-form.com/) com [Zod](https://zod.dev/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Internacionalização**: [react-i18next](https://react.i18next.com/)
- **Testes**: [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/react/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)

## ⚙️ Como Rodar o Projeto

Para instruções detalhadas sobre como configurar o ambiente, instalar dependências, adicionar a chave da Google Books API e executar a aplicação e os testes, por favor, consulte o arquivo [`INSTRUCTIONS.md`](./INSTRUCTIONS.md).

## 🔑 Credenciais de Teste

Para testar a funcionalidade de autenticação, você pode usar as seguintes credenciais:

- **Email:** `test@example.com`
- **Senha:** `password123`

Você também pode registrar um novo usuário.

## 📐 Arquitetura do Projeto

Para uma visão aprofundada da arquitetura do projeto, estrutura de pastas, decisões de design e como os desafios da Google Books API foram abordados, consulte o arquivo [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---
