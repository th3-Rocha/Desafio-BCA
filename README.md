# Desafio BCA - API de Transações Financeiras

Uma API RESTful robusta e escalável para gerenciamento de transações financeiras em tempo real, desenvolvida com NestJS e TypeScript.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Executando a Aplicação](#-executando-a-aplicação)
- [Testes](#-testes)
- [Documentação da API](#-documentação-da-api)
- [Decisões Técnicas](#-decisões-técnicas)

## 🎯 Visão Geral

Esta aplicação foi desenvolvida para processar e armazenar transações financeiras com alta performance, fornecendo estatísticas em tempo real sobre as operações realizadas. O sistema mantém um histórico de transações dos últimos 60 segundos, calculando automaticamente métricas como soma, média, valores máximo e mínimo.

### Principais Funcionalidades

- ✅ Registro de transações financeiras com validação temporal
- ✅ Cálculo automático de estatísticas em tempo real
- ✅ Limpeza completa do histórico de transações
- ✅ Health check para monitoramento da aplicação
- ✅ Validação robusta de dados de entrada
- ✅ Logs estruturados com Pino
- ✅ Rate limiting para proteção contra abuse
- ✅ Documentação interativa com Swagger

## 🏗️ Arquitetura do Projeto

O projeto segue os princípios de Clean Architecture e Domain-Driven Design, organizando o código em camadas bem definidas:

```
desafio-bca/
│
├── src/
│   ├── modules/                    # Módulos da aplicação organizados por domínio
│   │   │
│   │   ├── transactions/           # Domínio de Transações Financeiras
│   │   │   ├── dto/                # Data Transfer Objects para entrada de dados
│   │   │   │   └── create-transaction.dto.ts
│   │   │   ├── entities/           # Entidades de domínio
│   │   │   │   └── transaction.entity.ts
│   │   │   ├── interfaces/         # Contratos e abstrações do módulo
│   │   │   │   └── transaction-repository.interface.ts
│   │   │   ├── use-cases/          # Regras de negócio e casos de uso
│   │   │   │   ├── create-transaction.use-case.ts
│   │   │   │   ├── create-transaction.use-case.spec.ts
│   │   │   │   ├── delete-all-transactions.use-case.ts
│   │   │   │   └── delete-all-transactions.use-case.spec.ts
│   │   │   ├── transactions.controller.ts       # Controller HTTP
│   │   │   ├── transactions.controller.spec.ts
│   │   │   ├── transactions.repository.ts       # Implementação do repositório
│   │   │   ├── transactions.repository.spec.ts
│   │   │   └── transactions.module.ts           # Módulo NestJS
│   │   │
│   │   ├── statistics/             # Domínio de Estatísticas
│   │   │   ├── entities/           # Entidades do domínio estatístico
│   │   │   │   └── statistic.entity.ts
│   │   │   ├── interfaces/         # Contratos de estatísticas
│   │   │   │   └── statistics-repository.interface.ts
│   │   │   ├── use-cases/          # Lógica de cálculo de estatísticas
│   │   │   │   ├── get-statistics.use-case.ts
│   │   │   │   └── get-statistics.use-case.spec.ts
│   │   │   ├── statistics.controller.ts         # Controller de estatísticas
│   │   │   ├── statistics.controller.spec.ts
│   │   │   ├── statistics.repository.ts         # Repositório de estatísticas
│   │   │   ├── statistics.repository.spec.ts
│   │   │   └── statistics.module.ts             # Módulo de estatísticas
│   │   │
│   │   ├── database/               # Serviço de banco de dados em memória
│   │   │   ├── interfaces/         # Interface do serviço de database
│   │   │   │   └── database.interface.ts
│   │   │   ├── database.service.ts              # Implementação do storage
│   │   │   ├── database.service.spec.ts
│   │   │   └── database.module.ts               # Módulo de database
│   │   │
│   │   └── health/                 # Verificação de saúde da aplicação
│   │       ├── health.controller.ts             # Endpoint de health check
│   │       ├── health.controller.spec.ts
│   │       └── health-response.dto.ts           # DTO de resposta
│   │
│   ├── app.module.ts               # Módulo principal da aplicação
│   └── main.ts                     # Ponto de entrada da aplicação
│
├── test/                           # Testes de integração (E2E)
│   ├── app.e2e-spec.ts             # Suite de testes end-to-end
│   └── jest-e2e.json               # Configuração do Jest para E2E
│
├── .gitignore                      # Arquivos ignorados pelo Git
├── .prettierrc                     # Configuração do Prettier
├── docker-compose.yml              # Orquestração de containers
├── Dockerfile                      # Imagem Docker da aplicação
├── eslint.config.mjs               # Configuração do ESLint
├── nest-cli.json                   # Configuração do NestJS CLI
├── package.json                    # Dependências e scripts do projeto
├── pnpm-lock.yaml                  # Lock file do PNPM
├── pnpm-workspace.yaml             # Configuração de workspace do PNPM
├── tsconfig.json                   # Configuração principal do TypeScript
├── tsconfig.build.json             # Configuração de build do TypeScript
└── README.md                       # Este arquivo
```



## 🚀 Tecnologias Utilizadas

### Bibliotecas e Ferramentas
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação declarativa de dados
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Pino](https://getpino.io/)** - Logger de alta performance
- **[Swagger](https://swagger.io/)** - Documentação OpenAPI
- **[Helmet](https://helmetjs.github.io/)** - Segurança HTTP headers
- **[Throttler](https://docs.nestjs.com/security/rate-limiting)** - Rate limiting

### Testes
- **[Jest](https://jestjs.io/)** - Framework de testes
- **[Supertest](https://github.com/visionmedia/supertest)** - Testes HTTP

### DevOps
- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração local
- **[ESLint](https://eslint.org/)** - Linter de código
- **[Prettier](https://prettier.io/)** - Formatação de código

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js >= 18.x
- PNPM >= 8.x (ou NPM/Yarn)
- Docker e Docker Compose (opcional)

### Instalação das Dependências

```bash
pnpm install
```

## 🏃 Executando a Aplicação

### Modo Desenvolvimento

```bash
# Inicia a aplicação em modo watch (recarrega automaticamente)
pnpm run start:dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Modo Produção

```bash
# Build da aplicação
pnpm run build

# Executa o build de produção
pnpm run start:prod
```

### Usando Docker

```bash
# Build e execução com Docker Compose
docker compose up --build

# Execução em background
docker compose up -d

# Parar os containers
docker compose down
```

### Outros Comandos Úteis

```bash
# Formatar código
pnpm run format

# Executar linter
pnpm run lint

# Build do projeto
pnpm run build
```

## 🧪 Testes

O projeto possui uma estratégia de testes abrangente com testes unitários e de integração.

### Estrutura de Testes

#### Testes Unitários
Os testes unitários estão localizados **junto aos arquivos que testam**, seguindo o padrão `*.spec.ts`. 

Exemplo:
```
transactions.repository.ts
transactions.repository.spec.ts  ← Teste unitário do repository
```

#### Testes de Integração (E2E)
Os testes end-to-end estão localizados na pasta `test/` e validam fluxos completos da aplicação, incluindo:
- Criação de transações
- Recuperação de estatísticas
- Deleção de dados
- Health checks

### Executando os Testes

```bash
# Executar todos os testes unitários
pnpm run test

# Executar testes em modo watch
pnpm run test:watch

# Executar testes de integração (E2E)
pnpm run test:e2e

# Gerar relatório de cobertura
pnpm run test:cov

# Debug de testes
pnpm run test:debug
```

### Cobertura de Testes

O projeto está configurado para gerar relatórios de cobertura automaticamente. Após executar `pnpm run test:cov`, o relatório estará disponível em `coverage/lcov-report/index.html`.

Arquivos excluídos da cobertura:
- Interfaces (`*.interface.ts`)
- DTOs (`*.dto.ts`)
- Entities (`*.entity.ts`)
- Modules (`*.module.ts`)
- Entry point (`main.ts`)

## 📚 Documentação da API

A API possui documentação interativa gerada automaticamente com Swagger/OpenAPI.

### Acessar a Documentação

**Desenvolvimento Local:**
```
http://localhost:3000/api
```

**Produção:**
```
https://seu-dominio.com/api
```

### Endpoints Principais

#### Transações

- `POST /transactions` - Criar nova transação
- `DELETE /transactions` - Deletar todas as transações

#### Estatísticas

- `GET /statistics` - Obter estatísticas dos últimos 60 segundos

#### Health Check

- `GET /health` - Verificar saúde da aplicação

## 💡 Decisões Técnicas

### Arquitetura e Design

### Precisão Numérica
**Conversão para Centavos (Inteiros)**
- Valores monetários são convertidos para centavos na entrada (`amount * 100`)
- Armazenamento e cálculos realizados com números inteiros
- Reconversão para float na saída (`value / 100`)
- Elimina problemas de arredondamento de ponto flutuante
- Performance superior em operações matemáticas
- Precisão garantida em cálculos financeiros
