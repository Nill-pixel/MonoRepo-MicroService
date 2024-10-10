import { Log, PrismaClient } from "@prisma/client";
import { log } from "../types/log.interface";

export class LogService {
  private readonly prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }

  async save(logs: log): Promise<Log> {
    return await this.prisma.log.create({
      data: logs
    })
  }

  async get(): Promise<Log[]> {
    return await this.prisma.log.findMany();
  }

  async getInfo(): Promise<Log[]> {
    return await this.prisma.log.findMany({
      where: { level: 'INFO' }
    })
  }

  async getError(): Promise<Log[]> {
    return await this.prisma.log.findMany({
      where: { level: 'ERROR' }
    })
  }

  async getWarning(): Promise<Log[]> {
    return await this.prisma.log.findMany({
      where: { level: 'WARNING' }
    })
  }

  async countInfo(): Promise<Number> {
    return await this.prisma.log.count({
      where: { level: 'INFO' }
    })
  }
  async countError(): Promise<Number> {
    return await this.prisma.log.count({
      where: { level: 'ERROR' }
    })
  }
  async countWarning(): Promise<Number> {
    return await this.prisma.log.count({
      where: { level: 'WARNING' }
    })
  }
}