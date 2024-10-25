import { Log } from "../models/log.model";
import { LogService } from "../Services/log.service";
import { log } from "../types/log.interface";

export class LogController {
  constructor(private readonly logService: LogService) { }

  async save(log: log): Promise<Log> {
    return this.logService.save(log)
  }

  async get(): Promise<Log[]> {
    return this.logService.get()
  }

  async getInfo(): Promise<Log[]> {
    return this.logService.getInfo()
  }

  async getError(): Promise<Log[]> {
    return this.logService.getError()
  }

  async getWarning(): Promise<Log[]> {
    return this.logService.getWarning()
  }

  async countInfo(): Promise<Number> {
    return this.logService.countInfo()
  }

  async countError(): Promise<Number> {
    return this.logService.countError()
  }

  async countWarning(): Promise<Number> {
    return this.logService.countWarning()
  }
}