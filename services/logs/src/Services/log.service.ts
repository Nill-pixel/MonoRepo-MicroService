import { log } from "../types/log.interface";
import { AppDataSource } from "../db/data-source.db";
import { Log } from "../models/log.model";
import { Repository } from "typeorm";
import { LogLevel } from "../enum/log.level.enum";

export class LogService {
  private readonly logRepository: Repository<Log>
  constructor() {
    this.logRepository = AppDataSource.getRepository(Log)
  }

  async save(logs: log): Promise<Log> {
    return await this.logRepository.save(logs)
  }

  async get(): Promise<Log[]> {
    return await this.logRepository.find();
  }

  async getInfo(): Promise<Log[]> {
    return await this.logRepository.find({
      where: { level: LogLevel.INFO },
    })
  }

  async getError(): Promise<Log[]> {
    return await this.logRepository.find({
      where: { level: LogLevel.ERROR },
    });
  }

  async getWarning(): Promise<Log[]> {
    return await this.logRepository.find({
      where: { level: LogLevel.WARNING },
    });
  }

  async countInfo(): Promise<Number> {
    return await this.logRepository.count({
      where: { level: LogLevel.INFO },
    });
  }
  async countError(): Promise<Number> {
    return await this.logRepository.count({
      where: { level: LogLevel.ERROR },
    });
  }
  async countWarning(): Promise<Number> {
    return await this.logRepository.count({
      where: { level: LogLevel.WARNING },
    });
  }
}