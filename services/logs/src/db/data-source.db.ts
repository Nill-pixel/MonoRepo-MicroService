import { DataSource } from "typeorm";
import { Log } from "../models/log.model";

const mongoUri = "mongodb+srv://nilvanysanguito:ycuHR4hkrOD2X0wq@cluster0.oagc7qj.mongodb.net/logs?retryWrites=true&w=majority&appName=Cluster0";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: mongoUri,
  entities: [Log],
  synchronize: true, // Use com cautela em produção
  logging: true,
})

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado")
}).catch((error) => console.log(error))