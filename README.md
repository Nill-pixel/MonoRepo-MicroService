# Project Name - Monorepo Authentication System with Microservices

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](../CONTRIBUTING.md)

## About <a name="about"></a>

Este projeto é um sistema básico de autenticação construído em um ambiente de monorepo utilizando microserviços. Ele foi desenvolvido com Lerna, TypeScript e Express, utilizando Axios para a comunicação entre os microserviços. O sistema implementa autenticação com JWT (JSON Web Tokens) para garantir a segurança dos usuários e fornece um sistema centralizado de logs que registra todas as atividades no sistema, permitindo monitoramento e auditoria efetivos. Além disso, todos os microserviços possuem testes unitários e de integração para garantir a qualidade e a estabilidade do código.

O banco de dados utilizado é o PostgreSQL, acessado através do Prisma, que facilita a manipulação de dados e a integração com o banco.

## Getting Started <a name="getting_started"></a>

As instruções a seguir irão te guiar para ter uma cópia do projeto em execução em sua máquina local para fins de desenvolvimento e testes. Consulte a seção [deployment](#deployment) para notas sobre como implantar o projeto em um ambiente de produção.

### Prerequisites

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Npm](https://npm.com/)
- [Lerna](https://lerna.js.org/) (`yarn global add lerna`)

### Installing

1. Clone o repositório:

   ```bash
   git clone https://github.com/Nill-pixel/MonoRepo-MicroService.git
   ```

2. Instale as dependências do monorepo:

   ```bash
   npm install
   ```


3. Configure as variáveis de ambiente em cada microserviço conforme necessário. Um exemplo de arquivo `.env` pode ser encontrado em cada serviço.

    ```bash
    DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
    JWT_SECRET=seu_segredo
    ```

4. Execute as migrações do Prisma:

    ```bash
    npx prisma migrate dev --name init
    ```
5. Inicie todos os microserviços:

   ```bash
   lerna run dev
   ```

## Usage <a name="usage"></a>

O sistema consiste em diversos microserviços que se comunicam entre si via Axios, e os logs gerados por cada microserviço são enviados a um serviço centralizado de logs. Abaixo está um exemplo de fluxo básico de autenticação:

1. **Registro de usuário**: O cliente faz uma requisição para o microserviço de autenticação com os detalhes do usuário (e.g., email, senha).
   
2. **Login**: Após o registro, o usuário pode fazer login e receber um JWT como token de autenticação.
   
3. **Acesso a recursos protegidos**: Para acessar outros microserviços, o cliente deve incluir o JWT nos cabeçalhos das requisições. O sistema validará o token para conceder ou negar acesso.

### Comunicação entre Microserviços

Os microserviços se comunicam entre si utilizando Axios, enviando requisições HTTP entre as instâncias para compartilhar dados e realizar operações interdependentes. 

### Sistema de Logs

Todos os logs gerados por qualquer microserviço são enviados para um serviço centralizado de logging, o que facilita a auditoria e o monitoramento do sistema como um todo.

### JWT Autenticação

O sistema usa JWT para autenticar os usuários. Após o login bem-sucedido, um token é gerado e deve ser enviado com cada requisição subsequente para garantir a autorização e segurança do acesso.

## Tests <a name="tests"></a>

Os microserviços possuem testes unitários e de integração. Para rodar os testes, use os seguintes comandos:

1. **Testes Unitários**: Execute os testes unitários em cada serviço:

   ```bash
   lerna run test:unit
   ```

2. **Testes de Integração**: Execute os testes de integração para validar a comunicação entre os microserviços:

   ```bash
   lerna run test:integration
   ```

Os resultados dos testes serão exibidos no console e relatórios detalhados podem ser gerados para análise adicional.