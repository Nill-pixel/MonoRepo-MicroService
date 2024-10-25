import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { LogLevel } from "../enum/log.level.enum";

@Entity()
export class Log {
  @ObjectIdColumn({ name: "_id" })
  id?: ObjectId;  // Confirma ao TypeScript que será inicializado pela ORM

  @Column({
    type: "enum",
    enum: LogLevel,
    default: LogLevel.INFO, // Valor padrão opcional, se necessário
  })
  level!: LogLevel;

  @Column({ type: "text", nullable: true }) // Permitindo valores nulos para `message`
  message?: string;

  @Column({ type: "json" }) // Definindo `details` como JSON
  details!: Record<string, any>;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // Data padrão como `now()`
  data!: Date;
}
