# Trilha do Engenheiro de Dados

Um roteiro visual, estruturado e gratuito para quem quer se tornar Engenheiro de Dados — do absoluto zero até um nível profissional.

## O que é

Site interativo em português brasileiro com 5 etapas sequenciais de aprendizado, curado com recursos gratuitos de alta qualidade. Inclui comparativo visual entre os três maiores provedores de cloud (GCP, AWS e Azure) e um guia de tópicos essenciais de ELT com Python.

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Estilização | Tailwind CSS 4 + CSS custom properties |
| Linguagem | TypeScript 5.7 (strict mode) |
| Deploy | Netlify |

## Como rodar localmente

```bash
npm install
npm run dev
```

O servidor de desenvolvimento sobe em `http://localhost:3000`.

Para emular recursos Netlify localmente (recomendado):

```bash
netlify dev
```

## Estrutura do projeto

```
src/
├── routes/
│   ├── __root.tsx      # Layout raiz (lang=pt-BR, fonts, meta)
│   └── index.tsx       # Página principal do roadmap
├── styles.css          # Tokens de design, animações, utilitários
└── router.tsx          # Configuração do TanStack Router
```
