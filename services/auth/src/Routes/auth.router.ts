import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../Controllers/auth.controller";
import { AuthService } from "../Services/auth.service";
import { UserService } from "../Services/user.service";
import { sigInType, sigUpType } from "../types/auth.interface";

export class AuthRoutes {
  public router: Router
  private authController: AuthController

  constructor() {
    this.router = Router()
    const authService = new AuthService()
    const userService = new UserService()
    this.authController = new AuthController(authService, userService)

    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post('/register', this.register.bind(this))
    this.router.post('/login', this.signIn.bind(this))
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: sigUpType = req.body
      const newUser = await this.authController.register(userData)
      if (newUser) {
        res.status(200).json(newUser)
      } else {
        res.status(404).send('Error while save user')
      }
    } catch (error) {
      next(error)
    }
  }

  private async signIn(req: Request, res: Response, next: NextFunction) {
    const userData: sigInType = req.body
    const user = await this.authController.signIn((userData))
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send('Invalid Credentials')
    }
  }
}