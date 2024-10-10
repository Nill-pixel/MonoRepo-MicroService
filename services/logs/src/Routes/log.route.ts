import { NextFunction, Request, Response, Router } from "express";
import { LogController } from "../Controllers/log.controller";
import { LogService } from "../Services/log.service";
import { log } from "../types/log.interface";

export class LogRoutes {
  public route: Router
  private logController: LogController

  constructor() {
    this.route = Router()

    const logService = new LogService()
    this.logController = new LogController(logService)
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.route.post('/save', this.save.bind(this))
    this.route.post('/get', this.get.bind(this))
    this.route.post('/getInfo', this.getInfo.bind(this))
    this.route.post('/getError', this.getError.bind(this))
    this.route.post('/getWarning', this.getWarning.bind(this))
    this.route.post('/countInfo', this.countInfo.bind(this))
    this.route.post('/countError', this.countError.bind(this))
    this.route.post('/countWarning', this.countWarning.bind(this))
  }

  private async save(req: Request, res: Response, next: NextFunction) {
    try {
      const dataLog: log = req.body
      const log = await this.logController.save(dataLog)
      if (log) {
        res.status(200).send(log)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }
  private async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.get()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }

  private async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.getInfo()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }

  private async getError(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.getError()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }

  private async getWarning(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.getWarning()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }

  private async countInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.countInfo()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }

  private async countError(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.countError()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }

  private async countWarning(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.logController.countWarning()
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(400).send({ message: 'Error' })
      }
    } catch (error) {
      next(error)
    }
  }
}