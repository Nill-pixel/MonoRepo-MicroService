
## Requisitos

- [Node.js](https://nodejs.org/en/) v14 ou superior
- [MongoDB](https://www.mongodb.com/)
- Conexão com o MongoDB via Atlas ou local

## Instalação


1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente.

   No arquivo `.env`, adicione a URI de conexão com o MongoDB. Exemplo:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/logs?retryWrites=true&w=majority&appName=Cluster0
   ```

5. Atualize o arquivo `data-source.db.ts` para utilizar a variável de ambiente no lugar da string de conexão direta:

   ```typescript
   import { DataSource } from "typeorm";
   import { Log } from "../models/log.model";
   import * as dotenv from 'dotenv';

   dotenv.config();

   const mongoUri = process.env.MONGO_URI;

   export const AppDataSource = new DataSource({
     type: "mongodb",
     url: mongoUri,
     entities: [Log],
     synchronize: true, // Use com cautela em produção
     logging: true,
   });

   AppDataSource.initialize()
     .then(() => {
       console.log("Conectado");
     })
     .catch((error) => console.log(error));
   ```

## Execução

Para iniciar o projeto, execute o seguinte comando:

```bash
npm run start
```

Se a conexão for bem-sucedida, você verá a mensagem:

```bash
Conectado
```

## Dependências principais

- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [MongoDB](https://www.mongodb.com/)

## Estrutura do projeto

```
monotypescript/
│
├── services/
├── logs/
├── node_modules/
├── prisma/
├── src/
│   ├── Controllers/
│   ├── db/
│   │   └── data-source.db.ts  # Configuração da base de dados
│   ├── models/
│   │   └── log.model.ts       # Modelo da entidade Log
│   ├── Routes/
│   ├── Services/
│   ├── types/
│   └── index.ts
├── .env
├── package.json
└── README.md
```

