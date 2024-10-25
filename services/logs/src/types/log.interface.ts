import { LogLevel } from "../enum/log.level.enum";

export interface log {
  level: LogLevel; // O nível é do tipo LogLevel
  message?: string; // Mensagem opcional, pois pode ser nula
  details: Record<string, any>; // Details deve ser um objeto, representando JSON
  data?: Date; // Data opcional, se precisar incluir
}